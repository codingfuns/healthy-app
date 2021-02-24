/*
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-24 16:40:56
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-24 16:50:46
 */

(function(){
  var request = window.indexedDB.open('myApp','1.0');

  request.onerror = function(){
    console.log('数据库开启失败！');
  };
  request.onsuccess = function(){
    console.log('数据库打开成功！');
    window.db = request.result;
  };

  request.onupgradeneeded = function(event){
    console.log('数据库升级...');
    window.db = event.target.result;
    var objectStore;

    if(!db.objectStoreNames.contains('t_body')){
      objectStore = db.createObjectStore('t_body',{keyPath:'id'});
      objectStore.createIndex('id','id',{unique:true});
    }
    if(!db.objectStoreNames.contains('t_heart')){
      objectStore = db.createObjectStore('t_heart',{keyPath:'id'});
      objectStore.createIndex('id','id',{unique:true});
    }
  };


  window.sboxDB = {
    saveBodyInfo(data){

      var self = this;

      this.findBodyDataByAccount(data.id).then(function(res){
        if(res.length == 0){
          var addRequest =db.transaction(['t_body'],'readwrite').objectStore('t_body').add(data);

          addRequest.onerror = function(){
            console.log('保存失败');
          };
          addRequest.onsuccess = function(){
            console.log('保存成功');
          };
        }else{
          self.updateBodyInfo(data);
        }
      });
    },
    updateBodyInfo(data){
      var updateRequest =db.transaction(['t_body'],'readwrite').objectStore('t_body').put(data);

      updateRequest.onsuccess = function(){
        console.log('更新成功...');
      };
      updateRequest.onerror = function(){
        console.log('更新失败...');
      };

    },
    deleteBodyInfo(id){
      var deleteRequest =db.transaction(['t_body'],'readwrite').objectStore('t_body').delete(id);

      return new Promise(function(resolve,reject){
        deleteRequest.onsuccess = function(){
          console.log('删除成功...');
          resolve();
        };
        deleteRequest.onerror = function(){
          console.log('删除失败...');
          reject();
        };
      });

    },
    findByAccount(account){
      var userItem = [];
      var readStore = db.transaction('users').objectStore('users');
      var findRequest = readStore.get(account);

      return new Promise(function(resolve,reject){
        findRequest.onsuccess = function(){
          if(findRequest.result){
            // var _itemTemp = {};
            // _itemTemp.value = findRequest.result.account;
            // _itemTemp.password = findRequest.result.password;
            userItem.push(findRequest.result);
          }
          resolve(userItem);
        };
      });
    },
    readAllUser(){
      var userList = [];
      var readStore = db.transaction('users').objectStore('users');

      return new Promise(function(reslove,reject){
        readStore.openCursor().onsuccess = function(event){
          var cursor = event.target.result;

          if(cursor){
            var _temp = {};
            // _temp.account = cursor.value.account;
            // _temp.password = cursor.value.password;
            // _temp.isAutoLogin = cursor.value.isAutoLogin;
            // _temp.isRememberPwd = cursor.value.isRememberPwd;

            userList.push(cursor.value);
            cursor.continue();
          }else{
            console.log('用户信息读取完成..');
            reslove(userList);
          }
        };
      });

    },

    /**-------------锁屏操作-------- */
    saveLockedInfo(data){

      var self = this;

      this.findLockedByUserId(data.userId).then(function(res){
        if(res.length == 0){
          var addRequest =db.transaction(['locked'],'readwrite').objectStore('locked').add(data);

          addRequest.onerror = function(){
            console.log('保存失败');
          };
          addRequest.onsuccess = function(){
            console.log('保存成功');
          };
        }else{
          self.updateLocked(data);
        }
      });
    },
    updateLocked(data){
      var updateRequest =db.transaction(['locked'],'readwrite').objectStore('locked').put(data);

      updateRequest.onsuccess = function(){
        console.log('更新成功...');
      };
      updateRequest.onerror = function(){
        console.log('更新失败...');
      };

    },
    deleteLocked(userId){
      var deleteRequest =db.transaction(['locked'],'readwrite').objectStore('locked').delete(userId);

      return new Promise(function(resolve,reject){
        deleteRequest.onsuccess = function(){
          console.log('删除成功...');
          resolve();
        };
        deleteRequest.onerror = function(){
          console.log('删除失败...');
          reject();
        };
      });

    },
    findLockedByUserId(userId){
      var _Res = [];
      var readStore = db.transaction('locked').objectStore('locked');
      var findRequest = readStore.get(userId);

      return new Promise(function(resolve,reject){
        findRequest.onsuccess = function(){
          if(findRequest.result){
            // var _itemTemp = {};
            // _itemTemp.value = findRequest.result.account;
            // _itemTemp.password = findRequest.result.password;
            _Res.push(findRequest.result);
          }
          resolve(_Res);
        };
      });
    }
  };
})();
