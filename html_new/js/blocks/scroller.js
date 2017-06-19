var Frontend_Banner_Component = function(periods, banner) {
  var self = this;
  self.pos = 0;
  self.periods = periods;
  self.timeout = null;
  self.direction = 'f';
  self.is_mouse_over = false;

  var banner = $(banner),
      content = banner.find('.js-scroller__content'),
      nextBtn = banner.find('.js-nav-btn_next'),
      prevBtn = banner.find('.js-nav-btn_prev'),
      bannerMenu = banner.find('.js-scroller__menu');
  
  self.next = function() {
    if (self.pos >= self.getCount() - 1) return false;
    self.pos++;
    self.highlightMenu();
    var left = self.pos * -100;
    content.animate({'left' : left+'%'}, 500, 'linear');
    self.checkNavigation();
    self.planScroll();
  }

  self.prev = function() {
    if (self.pos <= 0) return false;
    self.pos--;
    self.highlightMenu();
    var left = self.pos * -100;
    content.animate({'left' : left+'%'}, 500, 'linear');
    self.checkNavigation();
    self.planScroll();
  }
  
  self.highlightMenu = function(index) {
    var pos = (typeof index == 'undefined') ? self.pos : index ;
    bannerMenu.find('a.act').removeClass('act');
    bannerMenu.find('a:eq('+pos+')').addClass('act');
  }

  self.checkNavigation = function() {
    var hide_prev = (self.getCount() == 1) || (!self.is_mouse_over) || (self.pos == 0);
    var hide_next = (self.getCount() == 1) || (!self.is_mouse_over) || (self.pos == self.getCount() - 1);

    if (hide_prev) {
      prevBtn.hide();
    } else {
      prevBtn.show();
    }

    if (hide_next) {
      nextBtn.hide();
    } else {
      nextBtn.show();
    }
  }

  self.getCount = function() {
    return periods.length;
  }
  
  self.getDirection = function() {
    if (self.pos == 0 && self.direction == 'b') {
      self.direction = 'f';
    } else if (self.getCount() - 1 == self.pos && self.direction == 'f') {
      self.direction = 'b';
    }
    return self.direction;
  }
  
  self.planScroll = function() {
    clearTimeout(self.timeout);
    if (self.getCount == 1) return;
    self.timeout = setTimeout(function() {
      if (self.getDirection() == 'f') {
        self.next();
      } else {
        self.prev();
      }
    }, self.periods[self.pos]*1000);
  }
  
  self.moveToSelected = function() {
    if ($(this).hasClass('act')) return false;
    var current_index = bannerMenu.find('a').index(bannerMenu.find('a.act'));
    var to_index = bannerMenu.find('a').index($(this));
    var scroll_through = to_index - current_index;
    self.pos = self.pos + scroll_through;
    self.highlightMenu(to_index);
    var left = self.pos * -100;
    content.animate({'left' : left+'%'}, 500, 'linear');
    self.checkNavigation();
    self.planScroll();
    return false;
  }


  self.__init__ = function() {
    prevBtn.on('click', self.prev);
    nextBtn.on('click', self.next);
    bannerMenu.find('a').on('click', self.moveToSelected);
    self.is_mouse_over = true;
    self.checkNavigation();
    self.planScroll();
  }
  
  self.__init__();

  $(bannerMenu).find('ul').bind('mousewheel', function(event,delta){
    this.scrollLeft -= (delta * 30);
    event.preventDefault();
  });

  if (Modernizr.touchevents) {
    content.swipe({
      swipeLeft:function(){
        nextBtn.click();
      },
      swipeRight:function(){
        prevBtn.click();
      }
    });
  }

}