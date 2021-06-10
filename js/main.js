$(function(){

    //slides of index.html

    if($('.swiper-container').length > 0){
        var swiper1 = new Swiper(".lines", {
            loop: true,
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
        });
    
        var swiper2 = new Swiper(".best-wrap", {
            loop: true,
            slidesPerView: 2.5,
            spaceBetween: 10
        });
    
        var swiper2 = new Swiper(".new-wrap", {
            loop: true,
            slidesPerView: 1.5,
            spaceBetween: 15
        });
    }


    //aside menu

    $('.aside').click(function(){
        $('aside').addClass('active');
    });
    $('.close').click(function(){
        $('aside').removeClass('active');
    });
    
    if($('.info').length > 0){
        $(".info").tabs();
    }
    


    // sub menu of list.html

    if($('.sub_menu').length > 0){
        $('.sub_menu').slick({
            infinite: false,
            arrows:false,
            variableWidth: true,
            slidesToShow: 1.5,
        });

        var subMenu = $('.sub_menu li a');
        subMenu.click(function(e){
            e.preventDefault();
            $('.sub_menu li').removeClass('active');
            $(this).parent().addClass('active');
        });
    }

    // icon filled
    $('.heart').click(function(){
        $(this).toggleClass('active');
    });
    $('.bag').click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $('body').addClass('modal');
        }
    });

    // modal out
    $('.continue a').click(function(e){
        e.preventDefault();
        $('body').removeClass('modal');
    });

    // detail_menu
    $('.detail_menu li a').click(function(e){
        e.preventDefault();
        $('.detail_menu li').removeClass('active');
        $(this).parent().addClass('active');
    });



    // price calculate
    if($('.cart_form'.length > 0)){

        var cartItem;
        var cartItemDel = $('.cart_list > li .close');

        cartItemDel.click(function(){
            $(this).parent().parent().remove();
            calcTotalPrice();
            whenZero();
        });

        function whenZero(){
            if($('.cart_list > li').length == 0){
                $('.empty').addClass('show');
                delivery = 0;
                $('.delivery').text('0원');
                $('.price_total').text('0원');
            } else {
                $('.empty').removeClass('show');
                delivery = 2500;
                $('.delivery').text('2500원');
            }
        }

        function calcTotalPrice(){
            cartItem = $('.cart_list > li');
            var itemTotal = 0;
            var priceTotal = 0;
            var delivery = parseInt($('.delivery').attr('data-price'));
            
            cartItem.each(function(){
                var itemlength = $(this).find('.up_down > p').text();
                var itemPrice = $(this).find('.unit_price').attr('data-price') * itemlength;

                $(this).find('.count > h5').text(itemPrice + '원');
                
                itemTotal += itemPrice;
            });
            priceTotal += itemTotal + delivery;

            if(priceTotal >= 100000){
                delivery = 0;
                priceTotal = itemTotal;
                $('.delivery').text('무료');
            } else {
                delivery = 2500;
                $('.delivery').text('2500원');
            }

            $('.item_total').text(itemTotal + '원');
            $('.price_total').text(priceTotal + '원');

        }

        calcTotalPrice();

        var updown = $('.up_down > div');

        updown.click(function(){
            if($(this).hasClass('plus')){
                var targetNum = parseInt($(this).siblings('p').text())+1;
                $(this).siblings('p').text(targetNum);
                calcTotalPrice();
            } else {
                var targetNum = parseInt($(this).siblings('p').text())-1;
                $(this).siblings('p').text(targetNum); 
                calcTotalPrice();

                if(targetNum == '0'){
                    //$(this).siblings('p').text(0);
                    $(this).parent().parent().parent().parent('li').remove();
                    whenZero();
                }
                
            }
        });

    }

    if($('.product_basic'.length > 0)){

        
        function calcTotalPrice(){
            var detailTotal = 0;
            var delivery = parseInt($('.delivery').attr('data-price'));
            var detaillength = $('.up_down_d > p').text();
            var priceTotal = $('.datail_price').attr('data-price') * detaillength;


            if(priceTotal >= 100000){
                delivery = 0;
                $('.delivery').text('무료');
            } else if(priceTotal == 0){
                delivery = 0;
            } else {
                delivery = 2500;
                $('.delivery').text('2500원');
            }

            priceTotal += detailTotal + delivery;
            $('.detail_total > h6').text(priceTotal + '원 (' + detaillength + '개)');
        
        }

        calcTotalPrice();

        var updown = $('.up_down_d > div');

        updown.click(function(){

            

            if($(this).hasClass('plus')){
                var targetNum = parseInt($(this).siblings('p').text())+1;
                $(this).siblings('p').text(targetNum);
                calcTotalPrice();
            } else {
                var targetNum = parseInt($(this).siblings('p').text())-1;
                $(this).siblings('p').text(targetNum); 
                calcTotalPrice();

                if(targetNum <= 0){
                    $(this).siblings('p').text(0);
                    $('.detail_total > h6').text(0 + '원 (' + 0 + '개)');
                }
            }
        });


    }

});