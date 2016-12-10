import Model from './AsteroidModel.js';

export default Model.extend({
    save(options) {
        var self = this;
        if(!options || !options.silent)
            self.trigger('before:save');
        this.asteroid.call('addPost',this.attributes).result.then((resp) => {
            if (resp.success) {
                self.model.set(resp.result,options);
                if(!options || !options.silent)
                    self.trigger('save',resp);
            } else {
                if(!options || !options.silent)
                    self.trigger('error:save',resp);
                throw new Error("Creating post error: "+resp.error);
            }
        });
    },

    validation: {

        type: {
            required:true
        },

        'details.title': {
            required: true
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