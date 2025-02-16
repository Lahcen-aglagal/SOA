
const { FormateData, GenerateSignature } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors')
const {CustomerRepository} = require('../database');

class CustomerService {

    constructor(){
        this.repository = new CustomerRepository();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        try {
            
            const existingCustomer = await this.repository.findCustomerByEmail(email);
            if(existingCustomer){
                const validPassword = existingCustomer.comparePassword(password);
                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token});
                } 
            }
            return FormateData(null);

        } catch (err) {
            throw new APIError('Data Not found', err)
        }

       
    }

    async SignUp(userInputs){
        
        const { email, password, phone , address , name } = userInputs;
        const existingCustomer = await this.repository.findCustomerByEmail(email);
        if(existingCustomer){
            return FormateData({ msg: 'Email already exists'});
        }
        try{
            const existingCustomer = await this.repository.CreateCustomer({ email, password, phone , address , name});
            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});
            return FormateData({id: existingCustomer._id, token });

        }catch(err){
            throw new APIError('Data Not found', err)
        }

    }

    async GetProfile(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById(id);
            
            return FormateData(existingCustomer);
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async GetShopingDetails(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById(id);
    
            if(existingCustomer){
               return FormateData(existingCustomer);
            }       
            return FormateData({ msg: 'Error'});
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }
}

module.exports = CustomerService;