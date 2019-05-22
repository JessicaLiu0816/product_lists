$(function(){

    //each loop funcntion:  show stock
    $("i.loop").on('click',showRemain);
    function showRemain(){
        $(this).find('.speech-bubble').toggleClass('noShow');
        $(this).find('.speech-bottom').toggleClass('noShow');
    }
    //delete item:
    $('i.trashCan').on('click',deleteItem);
    function deleteItem(){
      $(this).parent().parent().hide('slow')
    }

    //对打折后的数组reduce求和
    function sum(){
            var  totalResult =0;
            priceArr=[1.99,100.99,91.99,991.99,871.99];  
            var discountArr=[0.65,1,0.85,0.8,0.88] ;
            
            var pppArr=[];

            var priceDomArr=document.getElementsByClassName('pirceSpan');
            var  arrAfterDiscount=[];

            for(let i=0;i<priceDomArr.length;i++){        //得到所有原价的price list
                pppArr.push(Number(priceDomArr[i].textContent))
            }
        
            for(let i=0; i<priceArr.length;i++){          //得到所有打折后的 price list
                arrAfterDiscount.push(pppArr[i]*discountArr[i])
            }

            arrAfterDiscount.reduce (function(prev,curr){
                totalResult= prev+curr;
                return totalResult;
            },0) 

            $('#ttResult').text(totalResult.toFixed(2).toString());
        }
    sum();

    $("select").on('change',changeQuantity);

    function changeQuantity(){
       var selectedNum=$(this).children("option:selected").val();
       let index=$(this).parent().parent().attr('id');
       $(this).parent().next().find('span').text((selectedNum*priceArr[index-1]).toFixed(2));
      sum();
    }

    $('#name,#cardNumber,#mm,#yy,#cvv').on('focus',showGreen);
    $('#name,#cardNumber,#mm,#yy,#cvv').on('blur',showGray);
    function showGreen(){
        $(this).css('border','1px solid green');
    }
    function showGray(){
        $(this).css('border','1px solid #ccc');
    }
    $('#name').on('focus',function(){
        $(this).next().hide();
    });
    $('#cardNumber').on('focus',function(){
        $('#cardRemainer').hide();
    });

    $('#cardNumber,#cvv').on('keydown',function(e){
        e=window.event||e;
        if((e.keyCode<47 || e.keyCode>58) && e.keyCode!=8 ){
            return false;
        }   
    });


    $('#cardNumber').keyup(function() {
        var val = $(this).val();
        val = val.replace(/(\d{4})(?=\d)/g, "$1 ");
        $(this).val( val );
    });
    $('#mm').on('blur',function(){
        if($(this).val()<10 && $(this).val()[0]!=0 ){
                $(this).val( '0'+$(this).val());
        }
        if($(this).val()>12){
            $(this).val('');
        }
    })
    $('#mm,#yy').on('keydown',function(){
        if($(this).val().length>1){
            return false;
        }
    })

    $('#mm,#yy').on('focus',function(){
        $('#timeRemainer').hide();
    });
    document.getElementById('agree').addEventListener('focus',function(){
        $("#agreeReminder").hide();
    })
    

    //confirm 验证：
    $('#confirm').on('click',function(){
        var fullname=$('#name').val();
        var cardNum=$('#cardNumber').val();
        var month=$('#mm').val();
        var year=$('#yy').val();
        var cvv=$('#cvv').val();

        if(fullname==''){
            $('#name').css('border','1px solid red');
            $('#nameRemainer').show().css('color','red');
            
        }
        if(cardNum==''){
            $('#cardNumber').css('border','1px solid red');
            $('#cardRemainer').show().css('color','red');
         ;
        }
        if(month=='' || year==''){
            if(month==''){
                $('#mm').css('border','1px solid red');
            }
            if(year==''){
                $('#yy').css('border','1px solid red');
                $('#yy').css('border-left','none');
            }
            $('#timeRemainer').show().css('color','red');
       
        }
        if(cvv==''){
            $('#cvv').css('border','1px solid red');
      
        }

        if(!document.getElementById('agree').checked){
    
            $("#agreeReminder").show().css('color','red')
        }else{
            $("#agreeReminder").hide();
        }


    })
    
})