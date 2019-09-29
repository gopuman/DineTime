export default class loginController {
	static get $inject() {
		return ["authService", "$location", "$timeout"];
	}

	constructor(authService, $location, $timeout) {
		this.authService = authService;
		this.$location = $location;
		this.$timeout = $timeout;
		this.error = false;
		this.success = false;
		this.username = "";
		this.password = "";
		this.message = "";
	}

	login() {
		this.error = false;
		this.success = false;
		console.log("in login !!");
		const ctrl = this;
		this.authService.login(this.username, this.password).then(
			function(response) {
				if (response.data.status == "success") {
					localStorage.user = true;
					localStorage.username = ctrl.username;
					ctrl.success = true;
					ctrl.message = "Login Successful!";
					ctrl.$timeout(function() {
						ctrl.$location.path("/welcome");
					}, 1000);
				} else {
					localStorage.user = false;
					ctrl.error = true;
					ctrl.message = "Wrong username or password!";
					ctrl.username = "";
					ctrl.password = "";
				}
			},
			function() {
				localStorage.user = false;
				ctrl.error = true;
				ctrl.message =
					"Something went wrong on the server! Please try again!";
				ctrl.username = "";
				ctrl.password = "";
			}
		);
	}
}
