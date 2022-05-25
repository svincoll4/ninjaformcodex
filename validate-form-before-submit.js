
var myCustomFieldController = Marionette.Object.extend( {
    initialize: function() {

        var formChannel = Backbone.Radio.channel('form');
        this.listenTo(formChannel, 'loaded', this.formLoaded);

    },

    formLoaded: function(formModel){
        console.log(formModel);
        if(formModel.get('element_class') === 'ninja-retire-form'){
            let form_id = formModel.get('id');
            var formChannel = Backbone.Radio.channel( 'form-' + form_id );

            this.listenTo( formChannel, 'before:submit', this.beforeSubmit );
            this.listenTo( formChannel, 'submit:response', this.submitResponse );
        }
    },

    submitResponse: function(response){
      // do anything after submit
    },

    beforeSubmit: function(formModel){
      // do anything before submit
    
        let form_id = formModel.get('id');

        if(!jQuery('#dob').val()){

            jQuery('#dob').focus();

            nfRadio.channel( 'form-' + form_id ).request('add:error', 'dob', 'Please enter date of birth');

        }else{
            nfRadio.channel( 'form-' + form_id ).request('remove:error', 'dob');
        }

    }

});

// On Document Ready...
jQuery( document ).ready( function( $ ) {

    // Instantiate our custom field's controller, defined above.
    new myCustomFieldController();
});
