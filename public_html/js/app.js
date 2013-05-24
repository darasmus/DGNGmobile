//----------------------------------------------------------//
// main js lib for application
// using ember.js (mvc)
// author: ken kelly, denny arasmus - proximity technology
// (c) 2013
//----------------------------------------------------------//

Ember.ENV = 'undefined' === typeof ENV ? {} : ENV;

//--- application ---//
App = Ember.Application.create({
    ready: function(){
        App.capsulesController.loadCapsules();
        //App.postsController.loadPosts();
        App.machinesController.loadMachines();
        App.accessoriesController.loadAccessories();
    }
});

App.Adapter = DS.RESTAdapter.extend({
    namespace: 'json',
    buildURL: function(record, suffix) {
      return this._super(record,suffix) + '.json';
    }
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter  : App.Adapter.create()
});

App.Router.map(function() {
    this.route("index", { path: "/" });
    this.route("capsules", { path: "/capsules" }); 
    this.route("machines", { path: "/machines" });
    this.route("accessories", { path: "/accessories" });
    this.route('product', { path: '/product/:ProductId' });
    this.route('posts');
});

App.IndexRoute = Ember.Route.extend({
    
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
  },
  setupController: function(controller) {
    //controller.set('content', App.Post.find());
  }
});


App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    App.productController.getProduct();
  }
});

App.ApplicationView = Ember.View.extend({
    attributeBindings:['data-role'],
    'data-role': 'page'
});

//--- models ---//

App.Post = DS.Model.extend({
    displayname: DS.attr('string'),
    headline: DS.attr('string'),
    mobilecolor: DS.attr('string'),
    mobileicon: DS.attr('string'),
    mobilename: DS.attr('string'),
    name: DS.attr('string'),
    products: DS.hasMany('App.PostPro',{embedded: true})
});

App.PostPro = DS.Model.extend({
    displayname: DS.attr('string'),
    grossprice: DS.attr('string'),
    miles: DS.attr('string'),
    productid: DS.attr('string')
});

App.CategoryProduct = DS.Model.extend({
    DisplayName: DS.attr('string'),
    GrossPrice: DS.attr('string'),
    IsHidden: DS.attr('string'),
    IsInStock: DS.attr('boolean'),
    IsOrderable: DS.attr('boolean'),
    IsPayableByMiles: DS.attr('boolean'),
    MaxOrderable: DS.attr('string'),
    Miles: DS.attr('string'),
    MilesOnlyPromotionType: DS.attr('string'),
    MobileDescription: DS.attr('string'),
    MobileImageUrl: DS.attr('string'),
    OldPrice: DS.attr('string'),
    OriginalProduct: DS.attr('string'),
    ProductId: DS.attr('string'),
    ProductVat: DS.attr('string'),
    PromotionEndDate: DS.attr('string'),
    PromotionStartDate: DS.attr('string'),
    ShortDescription: DS.attr('string'),
    RecommendedProductIds: DS.attr('string')
});

App.Category = DS.Model.extend({
    DisplayName: DS.attr('string'),
    Headline: DS.attr('string'),
    MobileColor: DS.attr('string'),
    MobileIcon: DS.attr('string'),
    MobileName: DS.attr('string'),
    Name: DS.attr('string'),
    Products: []
});

//--- controller ---//           

App.ProductsController = Ember.ArrayController.extend({
    content: [],
            
    loadProducts: function() {
        this.set('content', App.Product.find()); 
    }
});
App.productsController = App.ProductsController.create();            


//-> capsules //
App.CapsulesController = Ember.ArrayController.extend({
    content: [],
            
    loadCapsules: function() {
        var me = this;
        var url = '/json/capsules.json';
        
        $.getJSON(url,function(data){
            me.set('content', []);
            $(data.Categories).each(function(index,value){
                var c = App.Category.createRecord({
                    DisplayName: value.DisplayName,
                    Headline: value.Headline,
                    MobileColor: value.MobileColor,
                    MobileIcon: value.MobileIcon,
                    MobileName: value.MobileName,
                    Name: value.Name,
                    Capsules: new Array()
                });
                
                $(value.Products).each(function(index,product){
                    var p = App.CategoryProduct.createRecord({
                        DisplayName: product.DisplayName,
                        MobileImageUrl: product.MobileImageUrl,
                        GrossPrice: product.GrossPrice,
                        Miles: product.Miles,
                        MobileDescription: product.MobileDescription,
                        ProductId: product.ProductId
                    });
                    
                    //is available?
                    if( (product.IsOrderable === true) && (product.IsInStock === true) ) {
                        c.Capsules.pushObject(p);
                    }
                });
                
                me.pushObject(c);
            });
        });
    }
});
App.capsulesController = App.CapsulesController.create(); 

//-> machines //
App.MachinesController = Ember.ArrayController.extend({
    content: [],
            
    loadMachines: function() {
        var me = this;
        var url = '/json/machines.json';
        
        $.getJSON(url,function(data){
            me.set('content', []);
            $(data.Categories).each(function(index,value){
                var c = App.Category.createRecord({
                    DisplayName: value.DisplayName,
                    Headline: value.Headline,
                    MobileColor: value.MobileColor,
                    MobileIcon: value.MobileIcon,
                    MobileName: value.MobileName,
                    Name: value.Name,
                    Machines: new Array()
                });
                
                $(value.Products).each(function(index,product){
                    var p = App.CategoryProduct.createRecord({
                        DisplayName: product.DisplayName,
                        MobileImageUrl: product.MobileImageUrl,
                        GrossPrice: product.GrossPrice,
                        Miles: product.Miles,
                        MobileDescription: product.MobileDescription,
                        ProductId: product.ProductId
                    });
                    
                    //is available?
                    //if( (product.IsOrderable === true) && (product.IsInStock === true) ) {
                        c.Machines.pushObject(p);
                    //}
                });
                
                me.pushObject(c);
            });
        });
    }
});
App.machinesController = App.MachinesController.create();

//-> accessoires //
App.AccessoriesController = Ember.ArrayController.extend({
    content: [],
            
    loadAccessories: function() {
        var me = this;
        var url = '/json/accessories.json';
        
        $.getJSON(url,function(data){
            me.set('content', []);
            $(data.Categories).each(function(index,value){
                var c = App.Category.createRecord({
                    DisplayName: value.DisplayName,
                    Headline: value.Headline,
                    MobileColor: value.MobileColor,
                    MobileIcon: value.MobileIcon,
                    MobileName: value.MobileName,
                    Name: value.Name,
                    Accessories: new Array()
                });
                
                $(value.Products).each(function(index,product){
                    var p = App.CategoryProduct.createRecord({
                        DisplayName: product.DisplayName,
                        MobileImageUrl: product.MobileImageUrl,
                        GrossPrice: product.GrossPrice,
                        Miles: product.Miles,
                        MobileDescription: product.MobileDescription,
                        ProductId: product.ProductId
                    });
                    
                    //is available?
                    if( (product.IsOrderable === true) && (product.IsInStock === true) ) {
                        c.Accessories.pushObject(p);
                    }
                });
                
                me.pushObject(c);
            });
        });
    }
});
App.accessoriesController = App.AccessoriesController.create();

App.PostsController = Ember.ArrayController.extend({
    content: [],
            
    loadPosts: function() {
        this.set('content', App.Post.find()); 
    }
});
App.postsController = App.PostsController.create(); 

//--- views ---//

var snapindex = 1;
App.CapView = Ember.View.extend({       
    didInsertElement: function() {
            var p = this.$();
            var _top = p.offset().top;
            var _index = snapindex*10;
            
            $(window).snap(_top,p);
            p.css({ 'position':'absolute', 'top': _top-60, 'z-index': _index, 'width': '100%'});
            snapindex++;
    }
});

var snapindex2 = 1;
App.MachView = Ember.View.extend({       
    didInsertElement: function() {
            var p = this.$();
            var _top = p.offset().top;
            var _index = snapindex2*10;
            
            $(window).snap(_top,p);
            p.css({ 'position':'absolute', 'top': _top-60, 'z-index': _index, 'width': '100%'});
            snapindex2++;
    }
});

var snapindex3 = 1;
App.AccView = Ember.View.extend({       
    didInsertElement: function() {
            var p = this.$();
            var _top = p.offset().top;
            var _index = snapindex3*10;
            
            $(window).snap(_top,p);
            p.css({ 'position':'absolute', 'top': _top-60, 'z-index': _index, 'width': '100%'});
            snapindex3++;
    }
});

//--- helper ---//

//not needed but good for dev helpers
Handlebars.registerHelper('listProducts', function(context, options) {    
  var ret = "";
  var data = options.contexts[0].Products;
  
  for(var i=0, j=data.length; i<j; i++) {
    ret = ret + '<section class="productlink clearfix" data-id="' + data[i].ProductId + '">'
              + '<h1>' + data[i].DisplayName + '</h1>'
              + '<img src="' + data[i].MobileImageUrl + '" />'
              + '<p class="price">' + data[i].GrossPrice + '</p>'
              + '<p class="miles">' + data[i].Miles + ' Punkte</p>'
              + '<aside>' + data[i].MobileDescription + '</aside>'
              + '</section>';
  }
  
  return ret;
});
