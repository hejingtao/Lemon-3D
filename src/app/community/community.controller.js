/**
 * ------------------------------------------------------------------
 * 管理员模块 控制器
 * ------------------------------------------------------------------
 */

var admin = function($scope, $rootScope, $timeout, $state, $http, $rootScope,  authService, tools, ENV){
  
  $scope.adminInit = function(){
  // 侧边栏展示状态数组
  $scope.listState = [];
  // 部门列表初始化
  $scope.structureList = [];
  // 初始化请求，加载部门列表
  tools.load(5000,'加载超时');
  $http({
    method: 'GET', 
    url: ENV.baseUrl + '/organizations/'+ $rootScope.mainOrganizationId +'/structures'
  })
  .success(function(data) {
    // 遍历部门列表,放入structureList中
    for(var i=0;i<data.structures.length;i++){

      $scope.listState.push(false);
      $scope.structureList[i] = {};
      $scope.structureList[i]['id'] = data.structures[i].id;
      $scope.structureList[i]['name'] = data.structures[i].name;
      $scope.structureList[i]['employees']= [];
    }
    // 遍历请求获取雇员列表
    for(var x=0;x<data.structures.length;x++){

      $http({
        method: 'GET', 
        url: ENV.baseUrl + '/structures/'+$scope.structureList[x].id+'/employees'
      })
      .success(function(data) {
        if(data.length == 0){
          return null;
        }
        // 遍历雇员列表，添加展示状态变量
        for(var y=0;y<data.length;y++){

          data[y].state = false;
        }
        // 遍历部门列表
        for(var t= 0;t<$scope.structureList.length;t++){

          // 寻找对应部门并且将雇员列表赋予给对应部门
          if($scope.structureList[t]['id'] == data[0].structure_id){
            $scope.structureList[t]['employees'] = data;
            break;
          }
        }

      })
    }

    tools.hide();
  });
  }
  $scope.adminInit();


  // @method 改变路由状态
  // 状态标识定义  无(0) OR 添加部门(1) OR 添加人员(2)
  if($state.current.name == 'admin'){
    $scope.actionState = 0;
  }else if($state.current.name == 'admin.addStructure'){
    $scope.actionState = 1;
  }else if($state.current.name == 'admin.addEmployee'){
    $scope.actionState = 2;
  }
  /**
   * 
   * @method 改变状态（无选择 OR 添加部门OR 添加人员）
   *
   * 无(0) OR 添加部门(1) OR 添加人员(2)
   *
   * @param    {number}  type     类型
   * @returns  void
   *
   * @date     2016-07-14
   * @author   hejingtao<hejigntao95@foxmail.com>
   */
  $scope.changeAction = function(type){

    if(type == 1){
      $scope.actionState = 1;
      $state.go('admin.addStructure');
    }else if(type == 2 ){
      $scope.actionState = 2;
      $state.go('admin.addEmployee');
    }
  }





  // @method listShow 侧边栏展开控制部分
  // 侧边栏一级菜单数量
  $scope.listLength = $scope.listState.length
  /**
   * 切换侧边栏展开状态
   *
   * 点击侧边栏一级菜单，展开或者收起
   *
   * @param    {number}  type     侧边栏序号，从0开始计算
   * @returns  void
   *
   * @date     2016-07-13
   * @author   hejingtao<hejigntao95@foxmail.com>
   */
  $scope.listShow = function (type, id) {

    if($scope.listState[type] == true){
      $scope.listState[type] = false
    }else {
      for(var i = 0;i<$scope.listLength;i++){
        $scope.listState[i] = false;
      }
      $scope.listState[type] = true;
    }
     $state.go('admin.editStructure',{'structureId': id});
  }
  $scope.itemShow = function (employeeId) {

    for(var i=0;i<$scope.structureList.length;i++){
      for(var x = 0;x<$scope.structureList[i].employees.length;x++){
        if($scope.structureList[i].employees[x].id == employeeId){
          $scope.structureList[i].employees[x].state = true;
        }else{
          $scope.structureList[i].employees[x].state = false;
        }
      }
    }
     $state.go('admin.editEmployee',{'employeeId': employeeId});
  }


  /**
   * 搜索栏 实现所用变量、函数
   * ------------------------------------------------------------------
   */
  //搜索结果展示状态
  $scope.searchState = false;
  // 搜索内容
  $scope.searchContent = '';
  // 搜索延时定时器储存标识
  $scope.searchTimeout = null;
  // 监听搜索框输入，延迟一定时间进行搜索
  $scope.$watch('searchContent',function(newValue){

    if(newValue == ''){
      $scope.searchState = false;
      return null;
    }
    $timeout.cancel($scope.searchTimeout);
    $scope.searchTimeout = $timeout(function(){ 

      $scope.searchResult = [];
      var tempContent = $scope.searchContent.replace(/(^\s*)|(\s*$)/g, "");
      for(var i = 0;i<$scope.structureList.length;i++){
          for(var x = 0;x<$scope.structureList[i].employees.length;x++){
            if($scope.structureList[i].employees[x].user_name.indexOf(tempContent) > -1){
              $scope.searchResult.push($scope.structureList[i].employees[x]);
            }
            
          }
      }
     },500);

    $scope.searchState = true;
    
  })
  // 搜索框选中或移出
  $scope.searchSelect = function(type){ 

    if(type == 1){
      $scope.searchContent = '';
      $scope.searchResult = [];
    }else{
      $timeout(function(){ $scope.searchState = false; },500);
    }
  }
  // 选择搜索结果
  $scope.chooseSearch = function(structureId, employeeId){
    for(var i = 0;i<$scope.structureList.length;i++){
      if($scope.structureList[i].id == structureId){
        for(var x = 0;x<$scope.listState.length;x++){
          $scope.listState[x] = false;
        }
        $scope.listState[i] = true;
        break;
      }
    }
    $scope.itemShow(employeeId);
  }

}





/**
 * ------------------------------------------------------------------
 * 管理员模块  添加部门模板 控制器
 * ------------------------------------------------------------------
 */


var admin_addStructure = function($scope, $http, $state, $rootScope, tools, ENV){

  // 添加部门变量定义
  $scope.newStructure = '';
  // 添加部门方法定义
  $scope.addStructure = function(){

    if($scope.newStructure != ''){
        // 初始化请求，加载structures
        $http({
          method: 'POST', 
          url: ENV.baseUrl + '/organizations/'+ $rootScope.mainOrganizationId +'/structures',
          params: { 
            'structure[name]': $scope.newStructure
          }
        }).
        success(function(data, status, headers, config) {
          $scope.adminInit();
          tools.alert('添加成功！');
          $state.go('admin');
        }).
        error(function(data, status, headers, config) {
          tools.alert('添加部门失败，请重试');
        });
    }else{
      console.log($scope.newStructure);
      tools.alert('请输入部门名称！');
    }
  }

}




/**
 * ------------------------------------------------------------------
 * 管理员模块 添加雇员模板 控制器
 * ------------------------------------------------------------------
 */


var admin_addEmployee = function($scope, $http, $state, $rootScope,  tools, ENV){

  // 添加雇员变量定义
  $scope.newEmployee = {
    'name': '',
    'phone': '',
    'job': '',
    'structure_id': ''
  };
  // 添加雇员方法定义
  $scope.addEmployee = function(){

      if($scope.newEmployee.name == '' || $scope.newEmployee.phone == ''){
      tools.alert('姓名和电话不能为空');
      return null;
     }else if($scope.newEmployee.structure_id == ''){
      tools.alert('请选择部门');
      return null;
     }
     $http({
        method: 'POST', 
        url: ENV.baseUrl + '/organizations/'+ $rootScope.mainOrganizationId +'/employees',
        params: { 
          'employee[structure_id]': $scope.newEmployee.structure_id,
          'employee[user_name]': $scope.newEmployee.name ,
          'employee[title]': $scope.newEmployee.job ,
          'user[dial_code]': 86,
          'user[cellphone]': $scope.newEmployee.phone
        }
      }).
      success(function(data, status, headers, config) {
        $scope.adminInit();
        tools.alert('添加成功！');
        $state.go('admin');
      }).
      error(function(data, status, headers, config) {
        tools.alert('添加部门失败，请重试');
      });
  }


  /**
   * 部门选择 实现所用变量、函数
   * ------------------------------------------------------------------
   */
  $scope.structureState = false;
  $scope.structureName = '';
  $scope.structureSelect = function(){

    $scope.structureState = !$scope.structureState;
  }
  $scope.chooseStructure = function(name,id){

    $scope.structureName = name;
    $scope.newEmployee.structure_id = id
    $scope.structureState = false;
  } 
}




/**
 * ------------------------------------------------------------------
 * 管理员模块  编辑部门模板 控制器
 * ------------------------------------------------------------------
 */


var admin_editStructure = function($scope, $http, $state, $stateParams, $interval, tools, ENV){

  
     var tempInterval= $interval(function(){
      if($scope.structureList.length != 0){
        for(var i = 0;i<$scope.structureList.length;i++){
          if($scope.structureList[i].id == $stateParams.structureId){
            $scope.structureName = $scope.structureList[i].name;
            $scope.structureId = $scope.structureList[i].id;
            break;
          }
        }
        $interval.cancel(tempInterval);
      }
    },100)

  
  $scope.editable = false;
  $scope.editContent = '修改';

  $scope.edit = function(){

    if( $scope.editable == false){
      $scope.editable = true;
      $scope.editContent = '确定';
    }else{
      $scope.editable = false;
      $scope.editContent = '修改';
      tools.alert('修改成功！［模拟］');
    }
  }

  $scope.deleted = function(){

      var apiLogoutUrl = ENV.baseUrl + '/structures/'+ $scope.structureId; 
      return $http.delete(apiLogoutUrl) 
      .then(function(response){
        if(response.status == 200){
          $scope.adminInit();
          tools.alert('删除成功!');
          $state.go('admin');
        }
      })
  }

}



/**
 * ------------------------------------------------------------------
 * 管理员模块  编辑雇员模板 控制器
 * ------------------------------------------------------------------
 */


var admin_editEmployee = function($scope, $http, $state, $stateParams, $interval, tools, ENV){

     var tempInterval= $interval(function(){
      try{
        if($scope.structureList[0].employees.length != 0){

          for(var i = 0;i<$scope.structureList.length;i++){

            for(var x = 0;x<$scope.structureList[i].employees.length;x++){

              if($scope.structureList[i].employees[x].id == $stateParams.employeeId){

                $scope.employee = $scope.structureList[i].employees[x];
                $scope.editName = $scope.employee.user_name;
                $scope.editId = $scope.employee.id;
                $scope.editJob = $scope.employee.title;
                $scope.editStructureId = null;
                $scope.structureName  = $scope.employee.structure_name;
                break;
              }
            }
          }
          $interval.cancel(tempInterval);
        }
      }catch(err){

      }
      
    },100)


  $scope.editable = false;
  $scope.editContent = '修改';
  $scope.edit = function(){

    if( $scope.editable == false){
      $scope.editable = true;
      $scope.editContent = '确定';
    }else{
      $scope.editable = false;
      $scope.editContent = '修改';
      tools.alert('修改成功！［模拟］');
    }
  }

  $scope.deleted = function(){

      var apiLogoutUrl = ENV.baseUrl + '/employees/'+ $scope.editId; 
      return $http.delete(apiLogoutUrl) 
      .then(function(response){
        if(response.status == 200){
          $scope.adminInit();
          tools.alert('删除成功!');
          $state.go('admin');
        }
      })
  }

  /**
   * 部门选择 实现所用变量、函数
   * ------------------------------------------------------------------
   */
  $scope.structureState = false;
  $scope.structureSelect = function(){
    if($scope.editable == false){
      return null;
    }
    $scope.structureState = !$scope.structureState;
  }
  $scope.chooseStructure = function(name,id){
    $scope.structureName = name;
    $scope.editStructureId = id
    $scope.structureState = false;
  } 

}






