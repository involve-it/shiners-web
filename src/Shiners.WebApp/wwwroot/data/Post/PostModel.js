﻿import Model from '../AsteroidModel.js';

export default Model.extend({

    create(options) {
        var self = this;
        if(!options || !options.silent)
            this.trigger('before:save');
        var photos = this.get('details').photos;
        if (photos && !_.isEmpty(photos)) {               
            $.ajax({
                type: "POST",
                url: "/Img/CommitUploadImage",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(photos)
            }).done(resp => {
                var details = self.get('details');
                details.photos = resp;
                self.set('details', details,{silent:true});
                self._create(options);
            });
        } else {
            this._create(options);
        }
    },

    isOwnerAsync(userId) {
        return $.ajax({
            url:'/api/posts/hasPost',
            data:{userId:userId,postId:this.get('_id')},
            method:'GET',
            type:'json'
        });
    },

    _create(options) {
        var self = this;
        return this.asteroid.call('addPost',this.attributes).then((resp) => {

        
        var postPosition = {};
        var navigatorPosition = app.user.get('position'),
            postCurrentPosition = this.get('details').locations;

        if(postCurrentPosition) {
            postCurrentPosition.map((location) => {
                if(location.placeType === 'dynamic') {
                    postPosition = {
                        lat: location.coords.lat(),
                        lng: location.coords.lng()
                    }
                } else {
                    postPosition = {
                        lat: navigatorPosition.lat,
                        lng: navigatorPosition.lng
                    };
                }
            });
        }

        if (resp.success) {
            self.set('_id', resp.result, options);
            if(!options || !options.silent)
                self.trigger('save', resp);
        } else {
            if(!options || !options.silent)
                self.trigger('error:save', resp.error);
            throw new Error("Creating post error: " + resp.error);
        }

        });
         /*
        return this.asteroid.call('addPost', this.attributes, postPosition).result.then((resp) => {

            if (resp.success) {
                self.set('_id',resp.result,options);
                if(!options || !options.silent)
                    self.trigger('save',resp);
            } else {
                if(!options || !options.silent)
                    self.trigger('error:save',resp.error);
                throw new Error("Creating post error: "+resp.error);
            }
        }).catch(err => {
            if(!options || !options.silent)
                self.trigger('error:save', err);
            console.error(err);
            throw new Error("Save fail from meteor! Custom error: " + err);
        });
        */
    },

    validation: {

        type: {
            required:true,            
            msg:'Введите категорию объявления'
        },

        endDatePost: {
            required:true,            
            msg:'Введите длительность объявления'
        },
        'details.title': {
            required: true,
            msg:'Введите название объявления'
        },

        'details.locations'(value, attr, computedState) {
            if (!value || _.isEmpty(value))
                return "Укажите местоположение";
        }
    }
});

//addPost(request, currentLocation)

//curentLocation={lat, lng}

//request={details, type, tags, jobsDetails, trainingDetails}


//details={anonymousPost,
//    url,
//    title,
//    description,
//    price,
//    photos,
//    locations,
//    other}
//locations=userId,
//              name,
//              accurateAddress="asfasf",
//              coords = {lat,lng,timestamp},
//              placeType=dynamic | static,
//              public=false,
//              _id,
//              obscuredCoords
//};

//photo = {
//    data,
//    thumbnail
//};





//jobsDetails={seniority,
//    gender,
//    contacts,
//    attachment,
//    typeCategory,
//    jobsType,
//    payMethod}

//trainingsDetails = {
//    sectionLearning,
//    typeCategory
//}

//return {success: true, result: post}