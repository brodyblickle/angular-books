app.config(function($stateProvider){
	var homeState = {
		name:'home',
		url: '/',
	}	
	
	
	var addState = {
		name: 'add',
		url: '/add',
		templateUrl: 'app/shared/partials/addBook.html'
	}
        
        var addTransactionState = {
		name: 'addTransaction',
		url: '/addTransaction',
		templateUrl: 'app/shared/partials/addTransaction.html'
	}
	
	var editBookState = {
		name: 'editBook',
		url: '/edit-book',
		templateUrl: 'app/shared/partials/editBook.html'
	}
	
        var editTransactionState = {
		name: 'editTransaction',
		url: '/edit-transaction',
		templateUrl: 'app/shared/partials/editTransaction.html'
	}
	var deleteState = {
		name: 'delete',
		url: '/delete',
		
	}
	
	$stateProvider.state(homeState);
	$stateProvider.state(addState);
        $stateProvider.state(addTransactionState);
	$stateProvider.state(editBookState);
        $stateProvider.state(editTransactionState);
	$stateProvider.state(deleteState);
});
