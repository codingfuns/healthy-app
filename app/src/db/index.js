/*
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-24 17:30:09
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-25 11:39:46
 */
export default class DB {
  dbObj = {
    name: "electron",
    version: 1,
    db: null
  };
  /**
   * @description: 初始化
   * @param {*}
   * @return {*}
   */
  initDB() {
    this.dbObj.version = this.dbObj.version || 1;
    var request = indexedDB.open(this.dbObj.name, this.dbObj.version);
    request.onerror = (e)=>{
      console.log(e.currentTarget.error.message);
    };
    request.onsuccess = (e)=>{
      this.dbObj.db = e.target.result;
    };
    request.onupgradeneeded = (e)=>{
      var thisDB = e.target.result;
      if (!thisDB.objectStoreNames.contains("t_body")) {
        var objStore = thisDB.createObjectStore("t_body", { keyPath: "id", autoIncrement: true });
        objStore.createIndex("id", "id", { unique: true });
        objStore.createIndex("timeStamp", "timeStamp", { unique: true });
      }
      if (!thisDB.objectStoreNames.contains("t_heart")) {
        var objStore = thisDB.createObjectStore("t_heart", { keyPath: "id", autoIncrement: true });
        objStore.createIndex("id", "id", { unique: true });
        objStore.createIndex("timeStamp", "timeStamp", { unique: true });
      }
    };
  };
  /**
   * @description: 关闭数据库
   * @param {*}
   * @return {*}
   */
  closeDB() {
    this.dbObj.db.close();
  };
  /**
   * @description: 删除数据库
   * @param {*}
   * @return {*}
   */
  deleteDB() {
    indexedDB.deleteDatabase(this.dbObj.name);
  }
  /**
   * @description 新增
   * @param {*} tableName 
   * @param {*} data 
   * @param {*} cb 
   */
  addData(tableName, data, cb) {
    var transaction = this.dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
      console.log("transaction complete");
    };
    transaction.onerror = function (event) {
      console.dir(event)
    };

    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.add(data);
    request.onsuccess = (e)=>{
      if (cb) {
        cb({
          error: 0,
          data: data
        })
      }
    };
    request.onerror = (e)=>{
      if (cb) {
        cb({
          error: 1
        })
      }
    }
  }
  /**
   * @description: 删除
   * @param {*} tableName
   * @param {*} id
   * @param {*} cb
   * @return {*}
   */
  deleteData(tableName, id, cb) {
    var transaction = this.dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
      console.log("transaction complete");
    };
    transaction.onerror = function (event) {
      console.dir(event)
    };
    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.delete(id);
    request.onsuccess = (e)=>{
      if (cb) {
        cb({
          error: 0,
          data: id
        })
      }
    };
    request.onerror = (e)=>{
      if (cb) {
        cb({
          error: 1
        })
      }
    }
  }
  /**
   * @description: 查询所有
   * @param {*} tableName
   * @param {*} cb
   * @return {*}
   */
  getDataAll(tableName, cb) {
    var transaction = this.dbObj.db.transaction(tableName, 'readonly');
    transaction.oncomplete = function () {
      console.log("transaction complete");
    };
    transaction.onerror = function (event) {
      console.dir(event)
    };

    var objectStore = transaction.objectStore(tableName);
    var rowData = [];
    objectStore.openCursor(IDBKeyRange.lowerBound(0)).onsuccess = function (event) {
      var cursor = event.target.result;
      if (!cursor && cb) {
        cb({
          error: 0,
          data: rowData
        });
        return;
      }
      rowData.push(cursor.value);
      cursor.continue();
    };
  }
  /**
   * @description: 根据ID查询
   * @param {*} tableName
   * @param {*} id
   * @param {*} cb
   * @return {*}
   */
  getDataById(tableName, id, cb) {
    var transaction = this.dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
      console.log("transaction complete");
    };
    transaction.onerror = function (event) {
      console.dir(event)
    };

    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.get(id);
    request.onsuccess = (e)=>{
      if (cb) {
        cb({
          error: 0,
          data: e.target.result
        })
      }
    };
    request.onerror = (e)=>{
      if (cb) {
        cb({
          error: 1
        })
      }
    }
  }
  /**
   * @description: 根据关键字查询
   * @param {*} tableName
   * @param {*} keywords
   * @param {*} cb
   * @return {*}
   */
  getDataBySearch(tableName, keywords, cb) {
    var transaction = this.dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
      console.log("transaction complete");
    };
    transaction.onerror = function (event) {
      console.dir(event)
    };

    var objectStore = transaction.objectStore(tableName);
    var boundKeyRange = IDBKeyRange.only(keywords);
    var rowData;
    objectStore.index("nickName").openCursor(boundKeyRange).onsuccess = function (event) {
      var cursor = event.target.result;
      if (!cursor) {
        if (cb) {
          cb({
            error: 0,
            data: rowData
          })
        }
        return;
      }
      rowData = cursor.value;
      cursor.continue();
    };
  }
  /**
   * @description: 根据日期获取数据
   * @param {*} tableName
   * @param {*} start
   * @param {*} end
   * @param {*} cb
   * @return {*}
   */
  getDataByTime(tableName, start, end, cb) {
    var transaction = this.dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
      console.log("transaction complete");
    };
    transaction.onerror = function (event) {
      console.dir(event)
    };

    var objectStore = transaction.objectStore(tableName);
    var boundKeyRange = IDBKeyRange.bound(start, end, false, true);
    var rowData = [];
    objectStore.index('timeStamp').openCursor(boundKeyRange).onsuccess = function (event) {
      var cursor = event.target.result;
      if (!cursor && cb) {
        cb({
          error: 0,
          data: rowData
        });
        return;
      }
      rowData.push(cursor.value);
      cursor.continue();
    };
  }
  /**
   * @description: 更新数据
   * @param {*} tableName
   * @param {*} id
   * @param {*} updateData
   * @param {*} cb
   * @return {*}
   */
  updateData(tableName, id, updateData, cb) {
    var transaction = this.dbObj.db.transaction(tableName, 'readwrite');
    transaction.oncomplete = function () {
      console.log("transaction complete");
    };
    transaction.onerror = function (event) {
      console.dir(event)
    };

    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.get(id);
    request.onsuccess = (e)=>{
      var thisDB = e.target.result;
      for (key in updateData) {
        thisDB[key] = updateData[key];
      }
      objectStore.put(thisDB);
      if (cb) {
        cb({
          error: 0,
          data: thisDB
        })
      }
    };
    request.onerror = (e)=>{
      if (cb) {
        cb({
          error: 1
        })
      }
    }
  }
}
