import {Controller} from "../../../../controllers/controller";
import {SwaggerDoc} from '@hypercolor/swagger-generator/'


@SwaggerDoc({
    description: 'This is the example GET Hello Controller',
    body: {},
    query: {},
    response:  { data: { greeting: 'Welcome!' } }
    })
export class HelloController extends Controller {
    public async handleRequest() {
        return {
            data: {
                greeting: 'Welcome!'
            }
        };
    }
}