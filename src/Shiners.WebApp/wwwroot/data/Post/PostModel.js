import Model from '../AsteroidModel.js';

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

    _create(options) {
        var self = this;
        return this.asteroid.call('addPost',this.attributes).result.then((resp) => {
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
                return "укажите местоположение";
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