
import { Component, OnInit, HostListener, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__, NgZone } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
var slideIndex = 1;
declare var Razorpay: any;
@Component({
	selector: 'app-listing',
	templateUrl: './listing.component.html',
	styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
	router: any;
	public token: any;
	current: any;
	variantData: any = [];
	sellerDetails: any = [];
	variantCount: any = [];
	variantNum: any = [];
	spec: any = [];
	follow: any = "";
	unfollow: any = "";
	folResult: boolean;
	followInfo: any = "";
	i: number = 0;
	filledStar: any = [];
	unFilledStar: any = [];
	j: number = 0;
	productRating: any;
	reviewStar: any;
	maxOQuant: any;
	minOQuant: any;
	discountLabel: any = [];
	ratingReview: any = [];
	filledStarRat: any = [];
	unFilledStarRat: any = [];
	submitted = false;
	success = false;
	reviewDateDiff: any = "";
	faqProduct: any = [];
	ratingData: any = [];
	activeStatusProd: any;
	priv: any;
	selName: string;
	giftOpn: any;
	sellerIdentity: any;
	varName: any;
	rfqInput: any = [];
	userId: any;
	rfqAddress: any = [];
	prod: any = [];
	idP: any;
	priceDate: any = [];
	titleGift: any;
	noteGift: any;
	addressGift: string;
	constructor(private data: DataService, private formBuilder: FormBuilder, private route: ActivatedRoute, private cookieService: CookieService) {
		this.checkoutForm = this.formBuilder.group({
			customername: ['', Validators.required],
			address: ['', Validators.required],
			email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
			contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

		})
	}
	dynamicData: any = "";
	imageSrc: string;
	Object = Object;
	tokenObj: object;
	tokenPrice: object;
	checkoutForm: FormGroup;
	dynamicdata: any = "";
	varient: any = "";
	stage1: boolean = false;
	largeSrc: any = "assets/images/Screenshot_20190712-201603.png";
	public counter: number;
	revId: number;
	bar1: any;
	bar2: any;
	bar3: any;
	bar4: any;
	bar5: any;
	datePickerDefault: number;
	shopIdentity: any;
	rfqEnabled: any = 0;
	giftEnable: any = 0;
	defRfqTag: any = 1;

	ngOnInit() {
		// this.setCookie("userId", 2);
		this.userId = this.getCookie("userId");

		//undeliverable popup show on page load
		// $("#undeliverableModal").modal('show');
		(<HTMLInputElement><any>document.getElementById("sh")).checked = true;

		//datepicker
		document.getElementById("buyNowId").style.display = "block";
		document.getElementById("reqNowId").style.display = "none";
		this.datePickerDefault = 1;

		this.route.queryParams.subscribe(params => {
			this.token = params['prod_id'];
			// console.log(this.token);
			this.tokenObj = { prod_id: this.token, user_id: this.userId };
			// console.log(this.tokenObj);
			// this.token = params['userId'];
		});

		this.data.getProductData(this.token).subscribe(
			data => {
				// console.log(data);
				this.dynamicData = data;
				var str = this.dynamicData.specification;
				var res = str.split("!~!");
				this.spec = res;
				this.minOQuant = this.dynamicData.minOrderQuant;
				this.maxOQuant = this.dynamicData.maxOrderQuant;
				this.counter = this.dynamicData.minOrderQuant;
				//rfq 1st prod
				this.prod[0] = this.dynamicData.name;

				// console.log(res);
				this.productRating = this.dynamicData.rating;
				for (this.i = 0; this.i < 5; this.i++) {
					if (this.i < this.productRating) {
						this.filledStar[this.i] = this.i;
					} else {
						this.unFilledStar[this.j++] = this.i;
					}
				}
				this.activeStatusProd = this.dynamicData.activeStatus;
				if (this.activeStatusProd == "inactive") {
					document.getElementById("buyNowId").style.display = "none";
					document.getElementById("reqNowId").style.display = "block";
				}
				this.giftOpn = this.dynamicData.hasGift;
				if (this.giftOpn == 0) {
					(<HTMLInputElement><any>document.getElementById("giftButton")).style.display = "none";
				}
				else if (this.giftOpn == 1) {
					(<HTMLInputElement><any>document.getElementById("giftButton")).style.display = "block";
				}

			},
			error => console.error(error)
		);

		this.data.getFollowInfo(this.tokenObj).subscribe(
			data => {
				// console.log(data);
				this.followInfo = data;
				var x = this.followInfo.response;
				// console.log(x);
				if (this.followInfo.response == "successful") {
					this.folResult = true;
					// this.follow();
				}
				else if (this.followInfo.response == "unsuccessful") {
					this.folResult = false;
				}
			},
			error => console.error(error)
		);
		this.data.getVariantInfo(this.token).subscribe(
			data => {
				// console.log(data);
				this.variantData = data;

			},
			error => console.error(error)
		);
		this.data.getPriceDate(this.token).subscribe(
			data => {
				// console.log(data);
				this.priceDate = data;

			},
			error => console.error(error)
		);
		this.data.getVariantCount(this.token).subscribe(
			data => {
				// console.log(data);
				this.variantCount = data;
			},
			error => console.error(error)
		);
		this.data.getVariantNumber(this.token).subscribe(
			data => {
				// console.log(data);
				this.variantNum = data;
			},
			error => console.error(error)
		);
		this.data.getSellerDetails(this.token).subscribe(
			data => {
				// console.log(data);
				this.sellerDetails = data;
				this.priv = this.sellerDetails.privateAccount;
				this.shopIdentity = this.sellerDetails.shopId;
				this.sellerIdentity = this.sellerDetails.sellerId;

				if (this.priv == 0) {
					this.selName = "" + this.sellerDetails.sellerName;

				}
				else {
					this.selName = "";
				}
			},
			error => console.error(error)
		);
		this.data.getDiscountLabel(this.token).subscribe(
			data => {
				// console.log(this.token);
				this.discountLabel = data;
			},
			error => console.error(error)
		);
		this.data.getRatingReview(this.token).subscribe(
			data => {
				this.ratingReview = data;
				this.reviewStar = this.ratingReview.rating;
				this.j = 0;
				for (this.i = 0; this.i < 5; this.i++) {
					if (this.i < this.reviewStar) {
						this.filledStarRat[this.i] = this.i;
					} else {
						this.unFilledStarRat[this.j++] = this.i;
					}
				}
			},
			error => console.error(error)
		);
		this.data.getDateDiff(this.token).subscribe(
			data => {
				this.reviewDateDiff = data;
			},
			error => console.error(error)
		);
		this.data.getFaqProduct(this.token).subscribe(
			data => {
				this.faqProduct = data;

			}
		);

		this.data.prodViewIncrement(this.token).subscribe();

		this.data.getRfqInputs(this.token).subscribe(
			data => {
				this.rfqInput = data;

			}
		);

		this.data.getRfqAddress(this.userId).subscribe(
			data => {
				this.rfqAddress = data;

			}
		);

		this.data.getProductRevRatings(this.token).subscribe(
			data => {
				this.ratingData = data;
				var totalRatings = this.ratingData.totRat;
				var rat1 = this.ratingData.rat1;
				var rat2 = this.ratingData.rat2;
				var rat3 = this.ratingData.rat3;
				var rat4 = this.ratingData.rat4;
				var rat5 = this.ratingData.rat5;
				this.bar1 = (rat1 * 100) / totalRatings;
				this.bar2 = (rat2 * 100) / totalRatings;
				this.bar3 = (rat3 * 100) / totalRatings;
				this.bar4 = (rat4 * 100) / totalRatings;
				this.bar5 = (rat5 * 100) / totalRatings;
			}
		);

		// $('#bar-five').css({'width':this.bar5% });
		// document.getElementById('bar-five').style.width = this.bar5;
		// document.getElementById('bar-four').style.width = this.bar4;
		// document.getElementById('bar-three').style.width = this.bar3;
		// document.getElementById('bar-two').style.width = this.bar2;
		// document.getElementById('bar-one').style.width = this.bar1;

		this.showSlides(slideIndex);

	}
	rfqDropdown() {
		document.getElementById("rfqDropdown").classList.toggle("show");
	}

	filterFunction() {
		var input, filter, ul, li, a, i, txtValue;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		ul = document.getElementById("myUL");
		li = ul.getElementsByTagName("li");
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("a")[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}

		var rfqSearchInput = (<HTMLInputElement><any>document.getElementById("myInput")).value.length;
		if (rfqSearchInput >= 3) {
			(<HTMLInputElement><any>document.getElementById("myUL")).style.display = "block";
		}
		else {
			(<HTMLInputElement><any>document.getElementById("myUL")).style.display = "none";

		}
	}
	count_inc() {

		if (this.counter < this.maxOQuant) {
			this.counter++;
			var xy: HTMLElement = document.getElementById("count") as HTMLElement;
			// this.fgOrderDetails.controls['quantity'].setValue(this.counter);
		}
	}
	count_dec() {

		if (this.counter > this.minOQuant) {
			this.counter--;
			var xy = document.getElementById("count") as HTMLElement;
			// this.fgOrderDetails.controls['quantity'].setValue(this.counter);
		}

	}
	myFunction(imgs) {
		var ele = document.getElementById(imgs) as HTMLImageElement;
		this.largeSrc = ele.src;
	}
	openModal() {
		document.getElementById("myModal").style.display = "block";
	}
	closeModal() {
		document.getElementById("myModal").style.display = "none";
	}
	plusSlides(n) {
		this.showSlides(slideIndex += n);
	}
	currentSlide(n) {
		this.showSlides(slideIndex = n);
	}
	showSlides(n) {
		var i;
		var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
		var dots = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLElement>;
		if (n > slides.length) { slideIndex = 1 }
		if (n < 1) { slideIndex = slides.length }
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[slideIndex - 1].style.display = "block";
		dots[slideIndex - 1].className += " active";
	}
	readMore() {
		// var res = str.split(" ");
		document.getElementById("lDesc").style.overflow = "visible";
		document.getElementById("seeMore").style.display = "none";
	}
	followShop() {
		this.folResult = true;
		this.data.getFollowShop(this.tokenObj).subscribe();
	}
	unfollowShop() {
		this.folResult = false;
		this.data.getUnfollowShop(this.tokenObj).subscribe();
	}
	report(revId: any) {
		console.log(revId);
		console.log(typeof (revId));
		this.data.sendReport(this.tokenObj, revId).subscribe();

	}
	likeCount(revId: any) {
		console.log(revId);
		// console.log(typeof(revId));
		this.data.likeRev(this.tokenObj, revId).subscribe();
		var ele = document.getElementById("likeImg") as HTMLImageElement;
		ele.src = "assets/icons/resources (IL)-23.png";
		var ele1 = document.getElementById("dislikeImg") as HTMLImageElement;
		ele1.src = "assets/icons/resources (IL)-11.png";

	}
	dislikeCount(revId: any) {
		console.log(revId);
		// console.log(typeof(revId));
		this.data.dislikeRev(this.tokenObj, revId).subscribe();
		var ele = document.getElementById("likeImg") as HTMLImageElement;
		ele.src = "assets/icons/resources (IL)-10.png";
		var ele1 = document.getElementById("dislikeImg") as HTMLImageElement;
		ele1.src = "assets/icons/resources (IL)-24.png";
	}
	reqDate() {
		var x = (<HTMLInputElement><any>document.getElementById("datePickerId")).value.length;
		// console.log(x);
		if (x != 0) {
			if (this.activeStatusProd == "inactive") {
				document.getElementById("buyNowId").style.display = "none";
				document.getElementById("reqNowId").style.display = "block";
			} else {
				this.datePickerDefault = 0;
				document.getElementById("buyNowId").style.display = "none";
				document.getElementById("reqNowId").style.display = "block";
				alert("Buy now changed to Request Order");
			}
		}
		else {
			if (this.activeStatusProd == "inactive") {
				document.getElementById("buyNowId").style.display = "none";
				document.getElementById("reqNowId").style.display = "block";
			} else {
				this.datePickerDefault = 1;
				document.getElementById("buyNowId").style.display = "block";
				document.getElementById("reqNowId").style.display = "none";
				alert("Request Order changed to Buy now");
			}
		}
	}
	// Cookie Section BEGN
	setCookie(cname, value) {
		this.cookieService.set(cname, value);
	}
	getCookie(cname) {
		return this.cookieService.get(cname);
	}
	deleteCookie(cname) {
		this.cookieService.delete(cname);
	}
	gift() {
		var title = (<HTMLInputElement><any>document.getElementById("fText")).value;
		var note = (<HTMLInputElement><any>document.getElementById("fNote")).value;
		var address = (<HTMLInputElement><any>document.getElementById("fAddress")).value;
		this.giftEnable = 1;
		this.titleGift = title;
		this.addressGift = address;
		this.noteGift = note;
		// console.log(title);
		// console.log(note);
		// console.log(address);
		this.setCookie("giftTitle", title);
		this.setCookie("giftNote", note);
		this.setCookie("giftAddress", address);
		// console.log(this.cookieService.get("giftTitle")+"cookie");
		// console.log(this.cookieService.get("giftNote")+"cookie");
		// console.log(this.cookieService.get("giftAddress")+"cookie");
	}

	rfqSubmit() {
		// alert("loaded");
		this.rfqEnabled = 1;
		var shopName = (<HTMLInputElement><any>document.getElementById("rfqShop")).value;
		var shopLocation = (<HTMLInputElement><any>document.getElementById("rfqLocations")).value;
		var note = (<HTMLInputElement><any>document.getElementById("rfqNote")).value;
		var productRef = this.prod[0];

		this.tokenPrice = { prod_id: this.token, user_id: this.userId, imageUploaded: 0, shop_name: shopName, shop_location: shopLocation, note: note, product_ref: productRef };

		this.data.sendRfq(this.tokenPrice).subscribe();

	}

	undeliverable() {
		var pincodeU = (<HTMLInputElement><any>document.getElementById("undPincode")).checked;
		var categoryU = (<HTMLInputElement><any>document.getElementById("undCategory")).checked;
		var continueU = (<HTMLInputElement><any>document.getElementById("undContinue")).checked;
		if (pincodeU == true) {

		}
		if (categoryU == true) {
			// var self = this;
			// self.router.navigate(['/categorylisting']);
			this.router.navigate(['/categorylisting/']);
			// this.ngZone.run(() => this.router.navigateByUrl('/categorylisting'));
		}
		if (continueU == true) {
			$("#undeliverableModal").modal('hide');
		}
	}
	addTagProduct(x: any) {
		var y = this.defRfqTag;
		this.prod[y++] = x;
		this.defRfqTag = y;
		console.log(this.prod);
	}
	delProduct(id: any) {
		var n = this.Object.keys(this.prod).length;
		var chiP = id.split("!");
		this.idP = chiP[0];
		var chiIndex = chiP[1];
		// console.log(this.idP);
		// console.log(chiIndex);


		document.getElementById(this.idP).style.display = "none";
		var removed = this.prod.splice(chiIndex, 1);
		// this.prod[chiIndex] = x;
		// if (chiIndex < n) 
		// { 
		//     n = n - 1; 
		//     for (var j:any =chiIndex; j<n; j++) 
		// 	this.prod[j] = this.prod[j+1]; 
		// } 
		// this.prod.length = n;
		console.log(removed);
		console.log(this.prod);
		this.defRfqTag = this.prod.length;


	}
	submitPrice(x: any) {
		if (x == 'buyNow') {
			var message = (<HTMLInputElement><any>document.getElementById("productMessage")).value;
			var productVariant = (<HTMLInputElement><any>document.getElementById("variantValue")).value;
			var productQuantity = (<HTMLInputElement><any>document.getElementById("productQuantity")).value;
			var imageUploaded = (<HTMLInputElement><any>document.getElementById("productImage")).value;
			var desiredDate = "none";
			var ship = (<HTMLInputElement><any>document.getElementById("sh")).checked;
			var cod = (<HTMLInputElement><any>document.getElementById("cOD")).checked;
			var pickup = (<HTMLInputElement><any>document.getElementById("pU")).checked;


			var res = productVariant.split(" ");
			this.varName = res[0];

			if (ship == true) {
				var deliveryOption = "shipping";
			}
			else if (cod == true) {
				var deliveryOption = "cod";
			}
			else if (pickup == true) {
				var deliveryOption = "pickup";
			}
			this.tokenPrice = { seller_identity: this.sellerIdentity, shop_id: this.shopIdentity, rfq_enabled: this.rfqEnabled, gift_enabled: this.giftEnable, prod_id: this.token, user_id: this.userId, message: message, productVariant: this.varName, productQuantity: productQuantity, imageUploaded: imageUploaded, desiredDate: desiredDate, deliveryOption: deliveryOption };

			this.data.sendOrderDetails(this.tokenPrice).subscribe();
		}
		if (x == 'requestOrder') {
			var message = (<HTMLInputElement><any>document.getElementById("productMessage")).value;
			var productVariant = (<HTMLInputElement><any>document.getElementById("variantValue")).value;
			var productQuantity = (<HTMLInputElement><any>document.getElementById("productQuantity")).value;
			var imageUploaded = (<HTMLInputElement><any>document.getElementById("productImage")).value;
			var desiredDate = (<HTMLInputElement><any>document.getElementById("datePickerId")).value;
			var ship = (<HTMLInputElement><any>document.getElementById("sh")).checked;
			var cod = (<HTMLInputElement><any>document.getElementById("cOD")).checked;
			var pickup = (<HTMLInputElement><any>document.getElementById("pU")).checked;

			var res = productVariant.split(" ");
			this.varName = res[0];

			if (ship == true) {
				var deliveryOption = "shipping";
			}
			else if (cod == true) {
				var deliveryOption = "cod";
			}
			else if (pickup == true) {
				var deliveryOption = "pickup";
			}
			this.tokenPrice = { seller_identity: this.sellerIdentity, shop_id: this.shopIdentity, rfq_enabled: this.rfqEnabled, gift_enabled: this.giftEnable, prod_id: this.token, user_id: this.userId, message: message, productVariant: this.varName, productQuantity: productQuantity, imageUploaded: imageUploaded, desiredDate: desiredDate, deliveryOption: deliveryOption };

			this.data.sendOrderDetails(this.tokenPrice).subscribe();
		}
	}
	submitCart() {
		if (this.giftEnable == 0) {
			var message = (<HTMLInputElement><any>document.getElementById("productMessage")).value;
			var productVariant = (<HTMLInputElement><any>document.getElementById("variantValue")).value;
			var productQuantity = (<HTMLInputElement><any>document.getElementById("productQuantity")).value;
			var imageUploaded = (<HTMLInputElement><any>document.getElementById("productImage")).value;
			var ship = (<HTMLInputElement><any>document.getElementById("sh")).checked;
			var cod = (<HTMLInputElement><any>document.getElementById("cOD")).checked;
			var pickup = (<HTMLInputElement><any>document.getElementById("pU")).checked;

			var x = (<HTMLInputElement><any>document.getElementById("datePickerId")).value.length;
			if (x == 0) {
				var desiredDate = "none";
			} else {
				var desiredDate = (<HTMLInputElement><any>document.getElementById("datePickerId")).value;
			}
			var res = productVariant.split(" ");
			this.varName = res[0];

			if (ship == true) {
				var deliveryOption = "shipping";
			}
			else if (cod == true) {
				var deliveryOption = "cod";
			}
			else if (pickup == true) {
				var deliveryOption = "pickup";
			}
			this.tokenPrice = { gift_title: null, gift_note: null, gift_address: null, seller_identity: this.sellerIdentity, shop_id: this.shopIdentity, rfq_enabled: this.rfqEnabled, gift_enabled: this.giftEnable, prod_id: this.token, user_id: this.userId, message: message, productVariant: this.varName, productQuantity: productQuantity, imageUploaded: imageUploaded, desiredDate: desiredDate, deliveryOption: deliveryOption };

			this.data.sendCartDetails(this.tokenPrice).subscribe();
		}
		if (this.giftEnable == 1) {
			var message = (<HTMLInputElement><any>document.getElementById("productMessage")).value;
			var productVariant = (<HTMLInputElement><any>document.getElementById("variantValue")).value;
			var productQuantity = (<HTMLInputElement><any>document.getElementById("productQuantity")).value;
			var imageUploaded = (<HTMLInputElement><any>document.getElementById("productImage")).value;
			// var desiredDate = (<HTMLInputElement><any>document.getElementById("datePickerId")).value;
			var ship = (<HTMLInputElement><any>document.getElementById("sh")).checked;
			var cod = (<HTMLInputElement><any>document.getElementById("cOD")).checked;
			var pickup = (<HTMLInputElement><any>document.getElementById("pU")).checked;

			var x = (<HTMLInputElement><any>document.getElementById("datePickerId")).value.length;
			if (x == 0) {
				var desiredDate = "none";
			} else {
				var desiredDate = (<HTMLInputElement><any>document.getElementById("datePickerId")).value;
			}
			var res = productVariant.split(" ");
			this.varName = res[0];

			if (ship == true) {
				var deliveryOption = "shipping";
			}
			else if (cod == true) {
				var deliveryOption = "cod";
			}
			else if (pickup == true) {
				var deliveryOption = "pickup";
			}
			this.tokenPrice = { gift_title: this.titleGift, gift_note: this.noteGift, gift_address: this.addressGift, seller_identity: this.sellerIdentity, shop_id: this.shopIdentity, rfq_enabled: this.rfqEnabled, gift_enabled: this.giftEnable, prod_id: this.token, user_id: this.userId, message: message, productVariant: this.varName, productQuantity: productQuantity, imageUploaded: imageUploaded, desiredDate: desiredDate, deliveryOption: deliveryOption };

			this.data.sendCartDetails(this.tokenPrice).subscribe();
		}
	}
}