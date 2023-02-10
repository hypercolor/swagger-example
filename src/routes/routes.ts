import * as e from 'express'
import {V1ApiRoutes} from "./api/v1/v1-api-routes";
import {SwaggerGenerator} from '@hypercolor/swagger-generator';


export class Routes {
    public static register(app: e.Application) {

        app.use(Root.build());

        const v1ApiRoutes = V1ApiRoutes.buildAndMountRoutes(app, '/api/v1');

        new SwaggerGenerator(
            'test',
            'password',
            "Swagger Example API Documentation",
            "Here lies a great description of the API docs..."
        ).build(app,
            '/swagger/v1',
            v1ApiRoutes);

        app.use('/swagger', (req, res) => res.redirect('/swagger/v1'));
    }
}

class Root {
    public static build(): e.Router {
        const router = e.Router();

        router.route('/').get(function(req: e.Request, res: e.Response) {
            res.json({message: 'This is the API, please visit our website.'});
        });

        return router;
    }
}