function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,$ocLazyLoadProvider,IdleProvider) {

    // Idle监听用户活动事件
    IdleProvider.idle(5);
    IdleProvider.timeout(120);

    var access = routingConfig.accessLevels;
    // 公共路由
    $stateProvider

        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.public
            }
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: 'res/views/404.html',
            data: { pageTitle: '渔径科技-页面无法找到', specialClass: 'gray-bg' },
        });

    // 访客路由
    $stateProvider
        .state('anon', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.anon
            }
        })
        .state('anon.index', {
            url: "/",
            templateUrl: "res/views/index.html",
            data: { pageTitle: '渔径科技在线学习与管理系统', specialClass: 'landing-page' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/wow/wow.min.js']
                        }
                    ]);
                }
            }
        })
        .state('anon.login', {
            url: "/login/",
            controller:UserLoginCtrl,
            templateUrl: "res/views/login.html",
            data: { pageTitle: '登录' }
        })
        .state('anon.register', {
            url: "/register/",
            controller:EnterpriseRegisterCtrl,
            templateUrl: "res/views/enterpriseRegister.html",
            data: { pageTitle: '注册' }
        });

    // 员工用户路由
    $stateProvider
        .state('staff', {
            abstract: true,
            templateUrl: "res/views/staff/common/content.html",
            data: {
                access: access.staff
            }
        })
        .state('staff.main', {
            url: "/staff/main",
            templateUrl: "res/views/staff/main.html",
            data: { pageTitle: '渔径-首页' }
        })
        .state('staff.contacts', {
            url: "/staff/contacts",
            templateUrl: "res/views/common/contacts.html",
            controller:StaffContactsCtrl,
            data: { pageTitle: '渔径-通讯录' }
        })
        .state('staff.learningPath', {
            url: "/staff/learningPath",
            templateUrl: "res/views/staff/staff_learning_path.html",
            controller:LearningPathCtrl,
            data: { pageTitle: '渔径-学习路径' }
        })
        .state('staff.coursesLibrary', {
            url: "/staff/coursesLibrary",
            templateUrl: "res/views/staff/courses_library.html",
            controller:CoursesLibraryCtrl,
            data: { pageTitle: '渔径-课程库' },
            resolve:{
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/shave/shave.js']
                        },
                        {
                            files: ['plugins/raty/jquery.raty.js',"plugins/raty/jquery.raty.css"]
                        },
                        {
                            files: ['plugins/pagination/jquery.twbsPagination.js']
                        }
                    ]);
                }
            }
        })
        .state('staff.courseDetail',{
            url:'/staff/courseDetail/:courseId',
            templateUrl: "res/views/staff/course_detail.html",
            controller:CourseDetailCtrl,
            data: { pageTitle: '渔径-课程信息' }
        })
        .state('staff.studyVideo',{
            url:"/staff/studyVideo/:courseId/:courseChapterIndex/:courseSectionIndex/:flag",
            controller:StudyVideoCtrl,
            templateUrl:"res/views/staff/course_video.html",
            data: { pageTitle: '渔径-课程学习' }
        })
        .state('staff.associates', {
            url: "/staff/associates",
            templateUrl: "res/views/staff/associates.html",
            controller:StaffAssociatesCtrl,
            data: { pageTitle: '渔径-同事圈' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'summernote',
                            files: ['plugins/summernote/css/summernote.css','plugins/summernote/js/summernote.js','plugins/summernote/js/angular-summernote.js','plugins/summernote/js/summernote-zh-CN.js']
                        },

                    ]);
                }
            }
        })
        .state('staff.announcementBoard', {
            url: "/staff/announcementBoard",
            controller:StaffAnnouncementsCtrl,
            templateUrl: "res/views/common/announcements_board.html",
            data: { pageTitle: '渔径-公告栏' }
        })
        .state('staff.others',{
            url:"/staff/others",
            templateUrl:"res/views/common/others.html",
            data: { pageTitle: '渔径-其他' }
        })

    // 企业用户路由
    $stateProvider
        .state('enterprise', {
            abstract: true,
            templateUrl: "res/views/enterprise/common/content.html",
            data: {
                access: access.enterprise
            }
        })
        .state('enterprise.main', {
            url: "/enterprise/main",
            templateUrl: "res/views/enterprise/main.html",
            data: { pageTitle: '渔径-首页' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'ui.checkbox',
                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
                        }
                    ]);
                }
            }
        })
        .state('enterprise.contacts', {
            url: "/enterprise/contacts",
            templateUrl: "res/views/common/contacts.html",
            controller:EnterpriseContactsCtrl,
            data: { pageTitle: '渔径-通讯录' }
        })
        .state('enterprise.info',{
            url:"/enterprise/info",
            templateUrl:"res/views/enterprise/info_management.html",
            controller:EnterpriseUserInfoCtrl,
            data: { pageTitle: '渔径-企业信息' },
            resolve:{
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css' ]
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        },
                        {
                            files: ['plugins/webuploader/css/webuploader.css','plugins/webuploader/js/webuploader.js']
                        }
                    ]);
                }
            }
        })
        .state('enterprise.staffs', {
            url: "/enterprise/staffs/",
            templateUrl: "res/views/enterprise/staffs_management.html",
            controller:StaffsManagementCtrl,
            data: { pageTitle: '渔径 - 员工管理' },
            resolve:{
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.min.js','css/plugins/dataTables/jquery.dataTables.min.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.buttons.min.js', 'js/plugins/dataTables/dataTables.select.min.js']
                        },
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/select.bootstrap.min.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.jqueryui.min.js','css/plugins/dataTables/dataTables.jqueryui.min.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie:true,
                            files:['js/plugins/editor/dataTables.editor.min.js','css/plugins/editor/editor.dataTables.min.css']
                        }
                    ]);
                }
            }
        })
        .state('enterprise.studyStatistics',{
            url:"/enterprise/announcements",
            templateUrl:"res/views/enterprise/study_statistics.html",
            controller:StudyStatisticsCtrl,
            data: { pageTitle: '渔径-学习统计' }
        })
        .state('enterprise.courses',{
            url:"/enterprise/courses",
            templateUrl:"res/views/enterprise/courses_management.html",
            controller:CoursesManagementCtrl,
            data: { pageTitle: '渔径-课程管理' },
            resolve:{
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/shave/shave.js']
                        },
                        {
                            files: ['plugins/raty/jquery.raty.js',"plugins/raty/jquery.raty.css"]
                        },
                        {
                            files: ['plugins/pagination/jquery.twbsPagination.js']
                        }
                    ]);
                }
            }
        })
        .state('enterprise.associates',{
            url:"/enterprise/associates",
            templateUrl:"res/views/enterprise/associates.html",
            controller:EnterpriseAssociatesCtrl,
            data: { pageTitle: '渔径-同事圈' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'summernote',
                            files: ['plugins/summernote/css/summernote.css','plugins/summernote/js/summernote.js','plugins/summernote/js/angular-summernote.js','plugins/summernote/js/summernote-zh-CN.js']
                        },
                    ]);
                }
            }
        })
        .state('enterprise.announcementBoard', {
            url: "/enterprise/announcementBoard",
            controller:EnterpriseAnnouncementsCtrl,
            templateUrl: "res/views/common/announcements_board.html",
            data: { pageTitle: '渔径-公告栏' }
        })
        .state('enterprise.announcementManagement',{
            url:'/enterprise/announcementManagement',
            templateUrl:"res/views/enterprise/announcements_management.html",
            controller:AnnouncementManagementCtrl,
            data: { pageTitle: '渔径-公告管理' },
            resolve:{
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css' ]
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        }
                    ]);
                }
            }
        })
        .state('enterprise.others',{
            url:"/enterprise/others",
            templateUrl:"res/views/common/others.html",
            data: { pageTitle: '渔径-其他' }
        })



    // 管理员路由
    $stateProvider
        .state('admin', {
            abstract: true,
            template: "res/views/enterprise/admin/common/content.html",
            data: {
                access: access.admin
            }
        })
        .state('admin.main', {
            url: "/admin/main/",
            templateUrl: "res/views/admin/main.html"
        })
        .state('admin.minor', {
            url: "admin/minor/",
            templateUrl: "res/views/admin/staffs_management.html",
            data: { pageTitle: 'Example view' }
        });



    // 指定默认地址
    $urlRouterProvider.otherwise(function($injector) {
        // 防止无限循环
        var $state = $injector.get('$state');
        $state.go('public.404');
    });

    $ocLazyLoadProvider.config({
        // 设置是否查看动态加载的内容和时间
        debug: false
    });

    // 解决可能存在的"/"问题
    $urlRouterProvider.rule(function($injector, $location) {
        if($location.protocol() === 'file')
            return;

        var path = $location.path()
            // 返回一个查询对象
            , search = $location.search()
            , params
        ;

        if (path[path.length - 1] === '/') {
            return;
        }

        if (Object.keys(search).length === 0) {
            return path + '/';
        }
        params = [];
        angular.forEach(search, function(v, k){
            params.push(k + '=' + v);
        });
        return path + '/?' + params.join('&');
    });

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
}

// 初始化
function run($rootScope, $state, AuthService,SweetAlert) {

    // 设置jQuery发送Ajax的全局选项
    jQuery.ajaxSetup({
        error:function (xhr,textStatus,error) {
            SweetAlert.swal({
                title:"网络请求异常",
                text:"向服务器发送请求时出现异常："+textStatus,
                type:"error"
            })
        }
    });

    $rootScope.$state = $state;

    // 监听路由改变事件
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

        if(!('data' in toState) || !('access' in toState.data)){
            $rootScope.error = "访问状态未定义";
            event.preventDefault();
        }
        else if (!AuthService.authorize(toState.data.access)) {
            $rootScope.error = "你没有访问的权限.";
            event.preventDefault();

            // 刚开始访问系统
            if(fromState.url === '^') {
                if(AuthService.isLoggedIn()===routingConfig.userRoles.staff.title) {
                    $state.go('staff.main');
                }else if(AuthService.isLoggedIn()===routingConfig.userRoles.enterprise.title){
                    $state.go('enterprise.main');
                } else if(AuthService.isLoggedIn()===routingConfig.userRoles.admin.title){
                    $state.go('admin.main');
                } else {
                    $rootScope.error = null;
                    $state.go('anon.index');
                }
            }else{
                event.preventDefault();
                SweetAlert.swal({
                    title:"权限不足",
                    text:"你没有访问该页面的权限！",
                    type:"error"
                })
            }
        }

    });

}

angular
    .module('fishing-path')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider','$ocLazyLoadProvider','IdleProvider',
        config])
    .run(['$rootScope', '$state', 'AuthService','SweetAlert',
        run]);
