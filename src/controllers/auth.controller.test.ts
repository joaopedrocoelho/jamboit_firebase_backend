import {describe, expect, test, jest, beforeAll} from '@jest/globals';
import { verify, JwtPayload } from 'jsonwebtoken';

test('returns an error because of invalid token', async () => {

    let refreshToken = '%221%2F%2F0eQUeBrCJSFB_CgYIARAAGA4SNwF-L9IrwPH4JSvsdY256NTqNScGX0wymMfYr8Xzjj3p1XkfkDDJaBJj-K8mfZ_fQx_EwChedmc%22'
    //generate  a mock response
    let decodedToken:JwtPayload;

   const fakeToken =  verify(refreshToken, process.env.CLIENT_SECRET,
        (err, decoded) => {
            if (err) {
                return {
                    message: "Couldn't decode token",
                };
            }
            decodedToken = decoded as JwtPayload;
        });
    

  

    
    expect(fakeToken).toEqual({
        message: "Couldn't decode token",
    })

});