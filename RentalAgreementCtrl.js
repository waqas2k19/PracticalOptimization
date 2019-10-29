var app = angular.module('practical');

app.controller('RentalAgreementCtrl', [
    '$scope', '$http', 'rentalAgreementService', function ($scope, $http, rentalAgreementService) {

        $scope.rentalAgreements = [];
        $scope.filteredRentalAgreements = [];
        $scope.filteredRentalAgreementParam = {};
        $scope.ArchivedRentalAgreements = [];
        $scope.pagingOptions = { pageSize: 25, currentPage: 1 };
        $scope.totalItems = 0;
        $scope.numPages = 0;
        $scope.DataLoaded = false;
        $scope.Agreement = {};

        $scope.pageChanged = function (agreement) {

            if ($scope.filteredRentalAgreementParam) {
                agreement = $scope.filteredRentalAgreementParam;
            }
            rentalAgreementService.getRentalAgreementsByPaging(agreement, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize).success(function (data) {
                $scope.rentalAgreements = data.data;
                if ($scope.filteredRentalAgreements) {
                    $scope.rentalAgreements = data.data;
                }
                $scope.totalItems = data.TotalRecord;
                $scope.DataLoaded = true;
            }).error(function (error) {
                $scope.status = 'Unable to load rental agreements data: ' + error.message;
            });
        };

        $scope.getItemsPerPage = function (agreement) {

            if ($scope.filteredRentalAgreementParam) {
                agreement = $scope.filteredRentalAgreementParam;
            }
            rentalAgreementService.getRentalAgreementsByPaging(agreement, $scope.pagingOptions.currentPage, $scope.itemsPerPage).success(function (data) {
                $scope.rentalAgreements = data.data;
                if ($scope.filteredRentalAgreements) {
                    $scope.rentalAgreements = data.data;
                }
                $scope.totalItems = data.TotalRecord;
                $scope.DataLoaded = true;
            }).error(function (error) {
                $scope.status = 'Unable to load rental agreements data: ' + error.message;
            });
            $scope.pagingOptions.pageSize = $scope.itemsPerPage;
        };

        $scope.resetForm = function (form) {
            angular.copy({}, form);
        };

        $scope.reInitObjects = function () {
            $scope.pagingOptions.currentPage = 1;
            $scope.pagingOptions.pageSize = 25;
        };


        $scope.RemoveAgreement = function (id) {
            $("#dialog-confirm-delete").removeClass('hide').dialog({
                resizable: false,
                width: '320',
                modal: true,
                title: '   Delete the item?',
                title_html: true,
                buttons: [
                    {
                        html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; Delete item", "class": "btn btn-danger btn-minier",
                        click: function () {

                            rentalAgreementService.RemoveAgreement(id)
                                .success(function (data) {
                                    ////debugger;                              
                                    rentalAgreementService.getRentalAgreementsByPaging($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize).success(function (data) {
                                        $scope.rentalAgreements = data.data;
                                        $scope.totalItems = data.TotalRecord;
                                        $scope.DataLoaded = true;
                                    }).error(function (error) {
                                        $scope.status = 'Unable to load rental agreements data: ' + error.message;
                                    });
                                    $("#dialog-confirm-delete").dialog("close");
                                    ShowInfoMessage("Deleted Successfully.", "Record has been deleted successfully.", "");
                                })
                                .error(function (error) {
                                    $("#dialog-confirm-delete").dialog("close");
                                    ShowInfoMessage("Fail.", data.data, "");
                                });
                        }
                    },
                    {
                        html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; Cancel", "class": "btn btn-minier",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
        };

        $scope.FilterAgreements = function (Agreement) {
            //debugger;
            //if (Agreement && !Agreement.AgreementStatus) {
            //    $scope.reInitObjects(); $scope.resetForm(Agreement); $scope.pageChanged();
            //    return 0;
            //}                   
            //    var reqStatus = $('#HdnReqStatus').val();
            //    debugger;
            //    if (reqStatus) {
            //        $('#FilterTypes').val(reqStatus);
            //        if (!$scope[Agreement]) {
            //            $scope[Agreement] = {};
            //        }
            //        //$scope[Agreement] = Agreement;
                Agreement.AgreementStatus = $scope.Agreement.AgreementStatus;
            //        //Agreement = $scope.Agreement;
            //}
            
                rentalAgreementService.Filter(Agreement/*, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize*/)
                    .success(function (data) {
                        $('#divAgreenentTbl').html(data);
                        //$scope.rentalAgreements = data.data;
                        //$scope.filteredRentalAgreements = data.data;
                        //$scope.filteredRentalAgreementParam = Agreement;
                        //$scope.totalItems = data.TotalRecord;
                        //$scope.DataLoaded = true;

                    })
                    .error(function (error) {
                        $scope.status = 'Unable to Filter: ' + error.message;
                    });
            
        };

        $scope.init = function () {
            // check if there is query in url
            // and fire search in case its value is not empty
            var reqStatus = $('#HdnReqStatus').val();
            //debugger;
            if (reqStatus) {
                $('#FilterTypes').val(reqStatus);
                //$('#FilterTypes').change();
                $scope.Agreement.AgreementStatus = reqStatus;                                  
            }
        };

        $scope.resetForm = function (Agreement) {
            angular.copy({}, Agreement);
            $('#frmFilterAgreements').trigger('reset');
            rentalAgreementService.Filter(Agreement/*, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize*/)
                .success(function (data) {
                    $('#divAgreenentTbl').html(data);
                })
                .error(function (error) {
                    $scope.status = 'Unable to Filter: ' + error.message;
                });
        };
        $scope.filterpageChanged = function (Agreement) {
            rentalAgreementService.Filter(Agreement/*, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize*/).success(function (data) {
                $scope.rentalAgreements = data.data;

                $scope.totalItems = data.TotalRecord;
                $scope.DataLoaded = true;
            }).error(function (error) {
                $scope.status = 'Unable to load rental agreements data: ' + error.message;
            });
        };


        //Archived Services
        //$scope.GetArchivedServices = function (currentPage, itemsPerPage) {
        //    $scope.itemsPerPage = itemsPerPage;
        //    rentalAgreementService.getArchServicesByPaging(currentPage, itemsPerPage).success(function (data) {
        //        $scope.ArchivedServices = data.data;
        //        $scope.totalItems = data.TotalRecord;
        //    }).error(function (error) {
        //        $scope.status = 'Unable to load Archived data: ' + error.message;
        //    });
        //}

        //$scope.pageChangedArch = function () {
        //    $scope.GetArchivedServices($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
        //};

        //$scope.getItemsPerPageArch = function () {
        //    $scope.GetArchivedServices($scope.pagingOptions.currentPage, $scope.itemsPerPage);
        //    $scope.pagingOptions.pageSize = $scope.itemsPerPage;
        //}
    }
]);

app.filter('jsonDate', function ($filter) {
    return function (input, format) {
        if (input !== undefined && input !== '') {
            return $filter('date')(parseInt(input.substr(6)), 'dd/MM/yyyy');
        } else {
            return '';
        }
    };
});