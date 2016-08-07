(function (angular) {
	'use strict';

	var MyModule = angular.module("MyModule", []);
	MyModule.controller("myController", ["$scope", function ($scope) {
		$scope.text = "";
		$scope.datas = [
			{id: new Date().getTime(), des: "吃饭", status: false, edit: false},
			{id: new Date().getTime() + 1, des: "睡觉", status: false, edit: false},
			{id: new Date().getTime() + 2, des: "洗衣服", status: true, edit: false}
		];

		//添加方法
		$scope.add = function () {
			if ($scope.text) {
				//如果不为空才进行添加，这里拿变量一定要从根作用域拿
				$scope.datas.push({id: new Date().getTime(), des: $scope.text, status: false});
				//重置text的值
				$scope.text = "";
			}
			//否则返回
			return;
		}

		//删除功能
		$scope.remove = function (id) {
			for (var i = 0; i < $scope.datas.length; i++) {
				var obj = $scope.datas[i];
				if (obj.id === id) {
					//i即为当前元素的位置
					$scope.datas.splice(i, 1);
					break;//记住break，提高效率,因为删除完一个就不需要了，如果是批量删除就不需要加
				}

			}
		}

		//删除所有完成的任务
		$scope.removeAll = function () {
			//无非就是改边模型，让界面自动刷新,删除的时候需要指定id,但是装入的时候却不需要
			var arr = [];
			for (var i = 0; i < $scope.datas.length; i++) {
				var obj = $scope.datas[i];
				if (obj.status !== true) {
					arr.push(obj);
				}
			}
			$scope.datas = arr;
		}

		//是否显示“删除所有完成的任务”按钮功能
		$scope.isShowRemoveAll = function () {
			for (var i = 0; i < $scope.datas.length; i++) {
				var obj = $scope.datas[i];
				//只要有一个是完成的，则显示
				if (obj.status === true) {
					return true;
				}
			}
			return false;
		}

		//双击编辑
		$scope.currentDblId = -1;
		$scope.doubleEdit = function (id) {
			//如果当前id所在的项的已经完成则不应该让编辑
			for (var i = 0; i < $scope.datas.length; i++) {
				var obj = $scope.datas[i];
				if (obj.id === id) {
					//当前项且已完成，必须这样判断，如果直接判断对象是否完成
					//点一个就会都判断，前面只要有完成的后面的就会直接结束掉了
					if (obj.status) {
						return;
					}
				}
			}
			//双击进行编辑，这里采用记录中间值的方法来确定当前被编辑的元素
			//这种方法可以成为前台受后台影响的一个通用方法，用一个中间值进行比对
			$scope.currentDblId = id;
		}

		//编辑之后的取消
		$scope.save = function () {
			//只要这里等于-1了，选中的id就不等于这个了，编辑状态就会被回复成以前的
			$scope.currentDblId = -1;
		}


		//全选或反选的通用写法
		$scope.allSelect = function () {
			//写一个标记
			var flag = false;
			for (var i = 0; i < $scope.datas.length; i++) {
				var obj = $scope.datas[i];
				if (!obj.status) {
					//有一个没选上则要变为全选，注意不要写成有一个选上了。
					//那样会造成死循环，因为下一次就会成全选，那一直就是全选了
					flag = true;
				}
			}

			//判断标记，需要两个for，因为走了if，不走else
			if (flag) {
				for (var j = 0; j < $scope.datas.length; j++) {
					var obj1 = $scope.datas[j];
					obj1.status = flag;
				}
			} else {
				for (var j = 0; j < $scope.datas.length; j++) {
					var obj1 = $scope.datas[j];
					obj1.status = flag;
				}
			}

			//统一重置标记
			flag = !flag;
		}


		$scope.clickAllState = true;
		$scope.clickActiveState = false;
		$scope.clickCompletedState = false;

		$scope.clickShow = "";

		$scope.clickState = function (state) {
			switch (state) {
				case "all":
				{
					$scope.clickAllState = true;
					$scope.clickActiveState = false;
					$scope.clickCompletedState = false;
					$scope.clickShow = "";
				}
					break;
				case "active":
				{
					$scope.clickAllState = false;
					$scope.clickActiveState = true;
					$scope.clickCompletedState = false;
					$scope.clickShow={status:false};
				}
					break;
				case "completed":
				{
					$scope.clickAllState = false;
					$scope.clickActiveState = false;
					$scope.clickCompletedState = true;
					$scope.clickShow={status:true};
				}
					break;
			}
		}

	}]);

})(angular);
