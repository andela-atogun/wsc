/*!CK:2161947685!*//*1434971698,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["Rs18G"]); }

__d("legacy:PhotoSnowlift",["PhotoSnowlift"],function(a,b,c,d){b.__markCompiled&&b.__markCompiled();a.PhotoSnowlift=b('PhotoSnowlift');},3);
__d("PhotoViewerFollow",["Arbiter","AsyncRequest","BanzaiODS","CSS","DOM","Event","Parent","PhotosConst","$"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){b.__markCompiled&&b.__markCompiled();var p={};function q(r){"use strict";this.viewer=r;}q.prototype.init=function(r,s,t,u,v,w,x){"use strict";this.subscribeLink=r;this.unsubscribeFlyout=s;this.subscribeEndpoints=v;this.unsubscribeEndpoints=w;this.unsubLinks=u;this.unsubDiv=t;this.reset();this.activate();this.type=x;l.listen(this.subscribeLink,'click',function(event){if(m.byClass(event.getTarget(),'photoViewerFollowLink'))this.subscribePhotoOwner();}.bind(this));l.listen(this.unsubLinks.user,'click',this.unsubscribePhotoOwner.bind(this));l.listen(this.unsubLinks.page,'click',this.unsubscribePhotoOwner.bind(this));g.subscribe(['FollowUser','FollowUserFail','UnfollowUser','UnfollowUserFail'],this.updateSubscribe.bind(this));g.subscribe(this.viewer.getEventString('DATA_CHANGE'),this.showSubscribeLinkOnChange.bind(this));if(this.viewer.getVersionConst()===n.VIEWER_SNOWLIFT){g.subscribe(this.viewer.getEventString('CLOSE'),this.reset.bind(this));g.subscribe(this.viewer.getEventString('OPEN'),this.activate.bind(this));}this.registerUnsubscribeTarget();};q.prototype.activate=function(){"use strict";this.activated=true;};q.prototype.reset=function(){"use strict";this.unsubscribeFlyout&&this.unsubscribeFlyout.clearNodes();this.subscriptionChange={};this.activated=false;};q.prototype.registerUnsubscribeTarget=function(){"use strict";if(!this.unsubscribeFlyout)return;var r=k.scry(this.subscribeLink,'.photoViewerFollowedMsg')[0];if(r&&!j.hasClass(r,'unsubFlyoutEnabled')){this.unsubscribeFlyout.initNode(r);j.addClass(r,'unsubFlyoutEnabled');}};q.prototype.updateSubscribe=function(r,s){"use strict";if(!this.activated)return;var t=s.profile_id;if(t){this.subscriptionChange[t]=r==='FollowUser'||r==='UnfollowUserFail'?'following':'unfollowed';this.toggleSubscribeLink(t);}};q.prototype.showSubscribeLinkOnChange=function(r,s){"use strict";this.type=s.ownertype;j.conditionClass(this.unsubDiv,'isPage',this.type==='page');this.toggleSubscribeLink(s.owner);};q.prototype.toggleSubscribeLink=function(r){"use strict";var s=k.scry(this.subscribeLink,'span.fbPhotoSubscribeWrapper')[0];if(!s)return;if(this.subscriptionChange[r]){j.conditionClass(s,'followingOwner',this.subscriptionChange[r]==='following');if(this.subscriptionChange[r]==='unfollowed')this.unsubscribeFlyout&&this.unsubscribeFlyout.hideFlyout(true);}this.registerUnsubscribeTarget();};q.prototype.subscribePhotoOwner=function(){"use strict";if(!this.viewer.getOwnerId())return;var r=(this.type==='user')?{profile_id:this.viewer.getOwnerId()}:{fbpage_id:this.viewer.getOwnerId(),add:true,reload:false,fan_origin:'photo_snowlift'};g.inform('FollowUser',{profile_id:this.viewer.getOwnerId()});if(this.type==='page')i.bumpEntityKey('snowlift_page_like','snowlift_page_like.clicked_link');r.location=this.FOLLOW_LOCATION_PHOTO;new h(this.subscribeEndpoints[this.type]).setAllowCrossPageTransition(true).setData(r).setMethod('POST').setReadOnly(false).setErrorHandler(g.inform.bind(null,'FollowUserFail',r)).send();};q.prototype.unsubscribePhotoOwner=function(){"use strict";if(!this.viewer.getOwnerId())return;var r=(this.type==='user')?{profile_id:this.viewer.getOwnerId()}:{fbpage_id:this.viewer.getOwnerId(),add:false,reload:false};g.inform('UnfollowUser',{profile_id:this.viewer.getOwnerId()});r.location=this.FOLLOW_LOCATION_PHOTO;new h(this.unsubscribeEndpoints[this.type]).setAllowCrossPageTransition(true).setData(r).setMethod('POST').setReadOnly(false).setErrorHandler(g.inform.bind(null,'UnfollowUserFail',r)).send();};q.createInstance=function(r,s,t,u,v,w,x,y){"use strict";var z=r.getInstance(),aa=new q(z);aa.init(o(s),t,u,v,w,x,y);p[z.getVersionConst()]=aa;return aa;};q.getInstance=function(r){"use strict";return p[r];};Object.assign(q.prototype,{FOLLOW_LOCATION_PHOTO:48});e.exports=q;},null);
__d("PhotosButtonTooltips",["Arbiter","DOMDimensions","Style","Tooltip"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();var k=[],l=[],m;function n(r,s){if(!r||!r.length||!s||!s.length||r.length!=s.length)throw new Error('Incorrect arguments passed in from PHP for photo button cropping');var t=0,u=[],v=false;for(t=0;t<r.length;t++){u.push(h.getElementDimensions(r[t]).width);if(u[t])v=true;}if(v){r.forEach(function(z){i.set(z,'max-width','100%');});for(t=0;t<r.length;t++){var w=r[t],x=u[t];if(x){var y=h.getElementDimensions(w).width;if(y>x){j.set(w,s[t]);l.push(w);}}}r.forEach(function(z){i.set(z,'max-width','');});}return v;}function o(){k.forEach(function(r){r.unsubscribe();});k=[];l.forEach(j.remove);l=[];}function p(r,s,t){this.arbiterToken=g.subscribe(r,function(){if(n(s,t))this.arbiterToken&&this.arbiterToken.unsubscribe();}.bind(this));}var q={init:function(){if(!m)m=g.subscribe('PhotoSnowlift.CLOSE',o);},registerButtonsOnPaging:function(r,s){k.push(new p('PhotoSnowlift.DATA_CHANGE',r,s).arbiterToken);},registerButtonsOnTaggingOn:function(r,s){k.push(new p('PhotoTagger.ACTIVATED_TAGGING',r,s).arbiterToken);},registerButtonsOnTaggingOff:function(r,s){k.push(new p('PhotoTagger.DEACTIVATED_TAGGING',r,s).arbiterToken);}};e.exports=q;},null);