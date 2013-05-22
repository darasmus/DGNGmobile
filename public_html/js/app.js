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
        App.categoriesController.loadCategories();
        //alert('Width: ' + $(window).width());
        //console.log(App.categoriesController);
    }
});

App.Store = DS.Store.extend({
  revision: 12,
});

App.Router.map(function() {
    this.route("index", { path: "/" });
    this.route("categories", { path: "/categories" }); 
});

App.IndexRoute = Ember.Route.extend({
    
});

App.ApplicationView = Ember.View.extend({
});

//--- models ---//

App.Product = DS.Model.extend({
    DisplayName: null,
    GrossPrice: null,
    IsHidden: null,
    IsInStock: null,
    IsOrderable: null,
    IsPayableByMiles: null,
    MaxOrderable: null,
    Miles: null,
    MilesOnlyPromotionType: null,
    MobileDescription: null,
    MobileImageUrl: null,
    OldPrice: null,
    OriginalProduct: null,
    ProductId: null,
    ProductVat: null,
    PromotionEndDate: null,
    PromotionStartDate: null,
    ShortDescription: null,
    RecommendedProductIds: null,
    Category: DS.belongsTo('App.Category')
});

App.Category = DS.Model.extend({
    DisplayName: null,
    Headline: null,
    MobileColor: null,
    MobileIcon: null,
    MobileName: null,
    Name: null,
    Products: DS.hasMany('App.Product', { embedded: true })
});

//--- controller ---//           

App.ProductController = Ember.ArrayController.extend({
    content: [],
});
App.productController = App.ProductController.create(); 

App.CategoriesController = Ember.ArrayController.extend({
    content: [],
            
    loadCategories: function() {
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
                    Products: new Array()
                });
                
                $(value.Products).each(function(index,product){
                    var p = App.Product.createRecord({
                        DisplayName: product.DisplayName,
                        MobileImageUrl: product.MobileImageUrl,
                        GrossPrice: product.GrossPrice,
                        Miles: product.Miles,
                        MobileDescription: product.MobileDescription,
                        ProductId: product.ProductId
                    });
                    
                    //is available?
                    if( (product.IsOrderable === true) && (product.IsInStock === true) ) {
                        c.Products.pushObject(p);
                    }
                });
                
                me.pushObject(c);
            });
        });
        
        //return this;
        //console.log(this.get('content'));
    }
});
App.categoriesController = App.CategoriesController.create(); 

//--- views ---//

var snapindex = 1;
App.CatView = Ember.View.extend({       
       
    didInsertElement: function() {
            var p = this.$();
            var _top = p.offset().top;
            var _index = snapindex*10;
            
            $(window).snap(_top,p);
            p.css({ 'position':'absolute', 'top': _top-60, 'z-index': _index});
            
            console.log(_top + " / " + _index);
            snapindex++;
    }
});

App.ProductView = Ember.View.extend({
    
    template: 'productTemplate',
    Products: function () {
        var prods = App.categoriesController.get('content');
        console.log(prods);
    }
});


//--- helper ---//

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