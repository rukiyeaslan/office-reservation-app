import {Express, Request, Response} from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {version} from '../../package.json'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: 'Office Reservation API Docs',
            version
        },
        components:{
            securitySchemes:{
                bearerAuth:{
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",   
                },
            },
        },
        security:[
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [ "./src/routes/*.ts", "./src/schemas/*.ts" ]
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number){
    //swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    //docs in JSON fromat
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Docs available at http://localhost:${port}/docs`);
}

// export default swaggerDocs;