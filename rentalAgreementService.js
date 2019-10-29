angular.module('practical').factory('rentalAgreementService', ['$http', function ($http) {

    var urlBase = '/Backend/Franchise/RentalAgreement';
    var dataFactory = {};


    dataFactory.getRentalAgreementsByPaging = function (agreement, currentPage, itemsPerPage) {
        //return $http.get(urlBase + '/GetRentalAgreementsByPaging?' + 'itemsPerPage=' + itemsPerPage + '&currentPage=' + currentPage);
        return $http({
            url: urlBase + '/GetRentalAgreementsByPaging?' + 'itemsPerPage=' + itemsPerPage + '&currentPage=' + currentPage,
            method: "POST",
            data: agreement
        });
    };

    dataFactory.Filter = function (Agreement/*, currentPage, itemsPerPage*/) {       
        return $http({
            //url: urlBase + '/FilterAgreements?itemsPerPage=' + itemsPerPage + '&currentPage=' + currentPage,
            url: urlBase + '/FilterAgreements',            
            method: "POST",
            data: Agreement
        });
    };

    dataFactory.FilterBookedOut = function (Agreement/*, currentPage, itemsPerPage*/) {
        return $http({
            //url: urlBase + '/FilterAgreements?itemsPerPage=' + itemsPerPage + '&currentPage=' + currentPage,
            url: urlBase + '/BookedOutList',
            method: "POST",
            data: Agreement
        });
    };

    dataFactory.FilterInvoiced = function (Agreement/*, currentPage, itemsPerPage*/) {
        return $http({
            //url: urlBase + '/FilterAgreements?itemsPerPage=' + itemsPerPage + '&currentPage=' + currentPage,
            url: urlBase + '/InvoicedList',
            method: "POST",
            data: Agreement
        });
    };

    dataFactory.RemoveAgreement = function (id) {
        return $http({
            url: urlBase + '/Delete',
            method: "POST",
            data: JSON.stringify({ 'id': id })
        });
    };
    //Archived Service
    dataFactory.getArchRentalAgreementsByPaging = function (currentPage, itemsPerPage) {
        return $http.get(urlBase + '/GetArchRentalAgreementsByPaging?itemsPerPage=' + itemsPerPage + '&currentPage=' + currentPage);
    };

    return dataFactory;
}
]);