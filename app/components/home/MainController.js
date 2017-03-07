app.controller('MainController',
        ['$scope', '$http', '$q', function ($scope, $http) {
                'use strict';
                var url = "http://localhost:8081/api/books/entries";
                $http.get(url).then(successCallback, errorCallback);
                function successCallback(response) {
                    $scope.bookList = response.data;
                }
                function errorCallback(error) {

                }
                var url2 = "http://localhost:8081/api/transactions/entries";
                $http.get(url2).then(successCallback2, errorCallback);
                function successCallback2(response2) {
                    $scope.transactionList = response2.data;
                }
                $scope.getDatetime = new Date();
 
                 
                 $scope.addBookAsync = function (book){
                   $scope.bookList.push({ 'title': book.title, 'author': book.author, 'isbn':book.isbn, 'booksTotal':book.booksTotal, 'publishDate':book.publishDate, 'category':book.category, 'booksIssued': 0, 'id': $scope.bookList.length});
                   // Write to server
                   var dataObj =  angular.toJson($scope.bookList);
                   
                   var res =  $http.post('http://localhost:8081/api/books/entries', dataObj);
                   res.success(function(data, status, headers, config){
                     $scope.message = data;
                   });
                   res.error(function(data, status, headers, config){
                     console.log("Error:" + JSON.stringify({data: data}));
                   });
                   
                 };
                 
                 $scope.addTransactionAsync = function (transaction){
                   // Update # of books issued in view
                   if(transaction.type == "issue") {
                     transaction.date = $scope.getDatetime;
                     console.log($scope.bookList[transaction.bookId].booksIssued);
                     $scope.bookList[transaction.bookId].booksIssued +=1;
                     $scope.updateBookList();
                   }
                   else {
                     transaction.returnDate = $scope.getDatetime;
                     $scope.bookList[transaction.bookId].booksIssued -=1;
                   }
                   $scope.transactionList.push({ 'id': $scope.transactionList.length, 'bookId': transaction.bookId, 'type': transaction.type, 'date' : transaction.date, 'returnDate': transaction.returnDate });
                   // Write to server
                   var dataObj =  angular.toJson($scope.transactionList);                   
                   var res =  $http.post('http://localhost:8081/api/transactions/entries', dataObj);
                   res.success(function(data, status, headers, config){
                     $scope.message = data;
                   });
                   res.error(function(data, status, headers, config){
                     console.log("Error:" + JSON.stringify({data: data}));
                   });
                   
                 };
                 
                 $scope.updateBookList = function () {
                   var dataObj =  angular.toJson($scope.bookList);
                   
                   var res =  $http.post('http://localhost:8081/api/books/entries', dataObj);
                   res.success(function(data, status, headers, config){
                     $scope.message = data;
                   });
                   res.error(function(data, status, headers, config){
                     console.log("Error:" + JSON.stringify({data: data}));
                   });
                   
                 };
                 var row = $scope.selectRow = function (row) {
                    console.log(row);
                    $scope.editBookDetails = row;
                };
                 $scope.updateBookTotals = function(){
                   $scope.bookList[$scope.editBookDetails.id].booksTotal = $scope.editBookDetails.booksTotal;  
                   $scope.updateBookList();
                 };
                 
                 $scope.deleteBook = function(){                     
                   var index = $scope.bookList.indexOf($scope.editBookDetails);
                   console.log(index);
                   $scope.bookList.splice(index, 1);
                   $scope.updateBookList();
                 };
                $scope.bookColumns =
                        [
                            {
                                Name: 'Book Name'
                            },
                            {
                                Name: 'Author'
                            },
                            {
                                Name: 'ISBN Code'
                            },
                            {
                                Name: '# of Books'
                            },
                            {
                                Name: 'Publish Date'
                            },
                            {
                                Name: 'Book Category'
                            },
                            {
                                Name: '# of Books Issued'
                            },
                            {
                                Name: 'Book ID'
                            }
                        ];
                $scope.transactionColumns =
                        [
                            {
                                Name: 'Book Transaction'
                            },
                            {
                                Name: 'Book ID' 
                           },
                            {
                                Name: 'Transaction Date'
                            },
                            {
                                Name: 'Transaction Type'
                            },
                            {
                                Name: 'Return Date'
                            }
                        ];

                $scope.currentNavItem = 'page1';
                $scope.navItems = [
                  { value: "page1", label: "Books"},
                  { value: "page2", label: "Transactions"}
                ];
                $scope.goToUrl = function (pathurl) {
                    console.log(pathurl);
                    $location.path(pathurl)
                };
                
               
            }]);
$('#myTable').on('click', '.clickable-row', function (event) {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active').siblings().removeClass('active');
    }
});
