/*
 * @Description: file content
 * @Author: Mr.WJ
 * @Date: 2021-02-25 09:54:18
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-25 09:55:07
 */
export const guid = ()=> {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}