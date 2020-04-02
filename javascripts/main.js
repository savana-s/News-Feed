//urls to each feed
var url_hockey = "http://www.espn.com/espn/rss/NHL/news"
var url_baseball = "http://www.espn.com/espn/rss/MLB/news"
var url_football = "http://www.espn.com/espn/rss/NFL/news"

//Template for each news item
var card_template = '<div class="mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text"></h2></div><div class="mdl-card__supporting-text"></div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored link_out mdl-js-button mdl-js-ripple-effect">See Original</a></div><div class="mdl-card__menu"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i class="material-icons">favorite_border</i></button></div></div>'

//handler for clicking on the favorite button
function favorite_click(){
	var user = JSON.parse(window.localStorage.getItem("current_user"));
	var card = $(this).closest(".mdl-shadow--2dp").clone();
	var url = card.find(".link_out").attr("href");
	var type = card.attr("type");
	var removing = false;
	for (var i = 0; i < user.favorites.length; i++){
		if (user.favorites[i].url == url){
			removing = true;
			console.log("removing");
			user.favorites.splice(i, 1);
			window.localStorage.removeItem("current_user");
			window.localStorage.removeItem(user.user);
			window.localStorage.setItem("current_user", JSON.stringify(user));
			window.localStorage.setItem(user.user, JSON.stringify(user));
			checkFavorites();
			$(".favorites_item").each(function(index, item){
				if($(item).find(".link_out").attr("href") == url){
					$(item).remove();
				}
			});

			$("." + type).each(function(index, item){
				if($(item).find(".link_out").attr("href") == url){
					$(item).find("i").html("favorite_border");
				}
			});
		}
	}

	if (!removing){
		$(".no_favorites").remove();
		user.favorites.push({"url":url});
		window.localStorage.setItem("current_user", JSON.stringify(user));
		window.localStorage.setItem(user.user, JSON.stringify(user));
		$(this).find("i").html("favorite");
		$(card).find("i").html("favorite");
		card.removeClass(type);
		card.addClass("favorites_item");
		card.find(".mdl-button--icon").click(favorite_click);
		$(".favorites").append(card);
	}

	/*var current = $(this).find("i").html();
	if (current == "favorite"){
		$(this).find("i").html("favorite_border");
	}
	else{
		$(this).find("i").html("favorite");
	}*/
}

//toggle hockey items
function hockey_switch(){
	if(this.checked){
		$(".hockey_item").removeClass("hidden");
	}
	else{
		$(".hockey_item").addClass("hidden");
	}
}

//initial call to get the hockey news
function get_hockey(callback){
	$.get(url_hockey, function(data){
    	var items = $(data).find("item");
    	$(items).each(function(i, item){
    		var card = $(card_template);
    		card.attr("type", "hockey_item");
    		card.find(".mdl-card__title-text").html($(item).find("title").text());
    		card.find(".mdl-card__supporting-text").html($(item).find("description").text());
    		card.find(".mdl-card__supporting-text").append("<br><br><i>" + $(item).find("pubDate").text() + "</i>");
    		card.find(".link_out").attr("href", $(item).find("link").text());
    		card.find(".link_out").attr("target", "_blank");
    		card.find(".mdl-button--icon").click(favorite_click);
    		$(card).addClass("hockey_item");
    		$(card).addClass("news_item");
    		$(card).addClass("hidden");
    		var user = JSON.parse(window.localStorage.getItem("current_user"));
			var url = $(item).find("link").text();
			for (var i = 0; i < user.favorites.length; i++){
				if (user.favorites[i].url == url){
					card.find(".material-icons").html("favorite");
					var clone = card.clone();
					clone.addClass("favorites_item");
					clone.find(".mdl-button--icon").click(favorite_click);
					clone.removeClass("hockey_item");
					clone.removeClass("hidden");
					$(".favorites").append(clone);
				}
			}
    		$(".items").append(card);
    	});
    	callback();
    	hockey_switch();
    });
}

//handler for baseball toggle
function baseball_switch(){
	if(this.checked){
		$(".baseball_item").removeClass("hidden");
	}
	else{
		$(".baseball_item").addClass("hidden");
	}
}

//initial call to get baseball items
function get_baseball(callback){
	$.get(url_baseball, function(data){
    	var items = $(data).find("item");
    	$(items).each(function(i, item){
    		var card = $(card_template);
    		card.attr("type", "baseball_item");
    		card.find(".mdl-card__title-text").html($(item).find("title").text());
    		card.find(".mdl-card__supporting-text").html($(item).find("description").text());
    		card.find(".mdl-card__supporting-text").append("<br><br><i>" + $(item).find("pubDate").text() + "</i>");
    		card.find(".link_out").attr("href", $(item).find("link").text());
    		card.find(".link_out").attr("target", "_blank");
    		card.find(".mdl-button--icon").click(favorite_click);
    		$(card).addClass("baseball_item");
    		$(card).addClass("news_item");
    		$(card).addClass("hidden");
    		var user = JSON.parse(window.localStorage.getItem("current_user"));
			var url = $(item).find("link").text();
			for (var i = 0; i < user.favorites.length; i++){
				if (user.favorites[i].url == url){
					card.find(".material-icons").html("favorite");
					var clone = card.clone();
					clone.find(".mdl-button--icon").click(favorite_click);
					clone.addClass("favorites_item");
					clone.removeClass("baseball_item");
					clone.removeClass("hidden");
					$(".favorites").append(clone);
				}
			}
    		$(".items").append(card);
    	});
    	callback();
    	baseball_switch();
    });
}

//handler for football toggle
function football_switch(event){
	if(this.checked){
		$(".football_item").removeClass("hidden");
	}
	else{
		$(".football_item").addClass("hidden");
	}
}

//initial call to get football news items
function get_football(callback){
	$.get(url_football, function(data){
    	var items = $(data).find("item");
    	$(items).each(function(i, item){
    		var card = $(card_template);
    		card.attr("type", "football_item");
    		card.find(".mdl-card__title-text").html($(item).find("title").text());
    		card.find(".mdl-card__supporting-text").html($(item).find("description").text());
    		card.find(".mdl-card__supporting-text").append("<br><br><i>" + $(item).find("pubDate").text() + "</i>");
    		card.find(".link_out").attr("href", $(item).find("link").text());
    		card.find(".link_out").attr("target", "_blank");
    		card.find(".mdl-button--icon").click(favorite_click);
    		$(card).addClass("football_item");
    		$(card).addClass("news_item");
    		$(card).addClass("hidden");
    		var user = JSON.parse(window.localStorage.getItem("current_user"));
			var url = $(item).find("link").text();
			for (var i = 0; i < user.favorites.length; i++){
				if (user.favorites[i].url == url){
					card.find(".material-icons").html("favorite");
					var clone = card.clone();
					clone.find(".mdl-button--icon").click(favorite_click);
					clone.addClass("favorites_item");
					clone.removeClass("football_item");
					clone.removeClass("hidden");
					$(".favorites").append(clone);
				}
			}
    		$(".items").append(card);
    	});
    	callback();
    	football_switch();
    });
}

function update_welcome(){
	var name = JSON.parse(window.localStorage.getItem("current_user")).user;
	$(".welcome").text("Welcome To Sports News, " + name);
}

function logout(){
	var user = JSON.parse(window.localStorage.getItem("current_user"));
	window.localStorage.removeItem("current_user");
	user.last_login = ("You were last logged in: " + new Date());
	window.localStorage.setItem(user.user, JSON.stringify(user));
	var location = window.location.href;
    var directoryPath = location.substring(0, location.lastIndexOf("/")+1);
    window.location.href = (directoryPath + "login.html");
}

function checkFavorites(){
	var user = JSON.parse(window.localStorage.getItem("current_user"));
	if(user.favorites.length == 0){
		$(".favorites").append("<i class='no_favorites'>No Favorites</i>");
	}
}

//fetch all the data and attach toggle handlers
$(document).ready(function() {
	var user = JSON.parse(window.localStorage.getItem("current_user"));
	$(".last_login").append("<br><i>" + user.last_login + "</i>");
	if (window.localStorage.getItem("current_user") == null){
		var location = window.location.href;
	    var directoryPath = location.substring(0, location.lastIndexOf("/")+1);
	    window.location.href = (directoryPath + "login.html");
	}

	checkFavorites();
	update_welcome();
	$(".logout").click(logout);
    get_hockey(function(){
    	$(".hockey_switch").on("change", hockey_switch);
    });
    get_baseball(function(){
    	$(".baseball_switch").on("change", baseball_switch);
    });
    get_football(function(){
    	$(".football_switch").on("change", football_switch);
    });
});
