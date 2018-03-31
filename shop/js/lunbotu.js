function lunbotu(){
	var li_num=$('.pic ul li').size();
	var n=0;
	var timer;
	var aLi=$('.pic ul li');
	var aBtn = $('.pic ol li');
	
	aBtn.click(function(){
		if(n==$(this).index()){return}
		$(this).addClass('ac').siblings().removeClass('ac');
		aLi.eq($(this).index()).finish().fadeIn();
		aLi.eq(n).finish().fadeOut();
		n = $(this).index();
	});
	$('.nextBtn').click(function(){
		if(n==aLi.length-1){n=-1}
		aBtn.eq(n+1).addClass('ac').siblings().removeClass('ac');
		aLi.eq(n+1).finish().fadeIn();
		aLi.eq(n).finish().fadeOut();
		n=n+1;
	});
	$('.prevBtn').click(function(){
		if(n==-1){n=aLi.length-1};
		aBtn.eq(n-1).addClass('ac').siblings().removeClass('ac');
		aLi.eq(n-1).finish().fadeIn();
		aLi.eq(n).finish().fadeOut();
		n=n-1;
	})

	function jishi(){
		clearInterval(timer);
		timer=setInterval(function(){
			if(n==aLi.length-1){n=-1}
			aBtn.eq(n+1).addClass('ac').siblings().removeClass('ac');
			aLi.eq(n+1).fadeIn();
			aLi.eq(n).fadeOut();
			n=n+1;
		},2000)
	}
	jishi()
	$('#slideA').hover(function(){
		clearInterval(timer)
	},function(){
		jishi()
	})


	$('#slideA').mouseenter(function(){
		$('.prevBtn').removeClass('bc')
		$('.nextBtn').removeClass('bc')
	})
	$('#slideA').mouseleave(function(){
		$('.prevBtn').addClass('bc')
		$('.nextBtn').addClass('bc')
	})
}