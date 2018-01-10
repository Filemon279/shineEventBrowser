FlowRouter.route('/eventBrowser', {
    action: function(params, queryParams) {
      BlazeLayout.render('eventBrowserLayout', { top: "header", main: "eventBrowserLayout" });
    }
})

FlowRouter.route('/', {
  triggersEnter: [function(context, redirect) {
    redirect('/eventBrowser');
  }],
  action: function(_params) {
    throw new Error("this should not get called");
  }
});