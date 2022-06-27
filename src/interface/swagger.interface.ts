export interface SwaggerauthTokenModel {
    type: String;
    name: String;
    in: String;
}

export interface SwaggerSecurityDefinitionModel {
    authtoken?: SwaggerauthTokenModel;
    apikey?: SwaggerauthTokenModel;
}

export interface SwaggerTagModel {
    name: String;
    description: String;
}

export interface SwaggerInfoModel {
    description: String;
    version: String;
    title: String;
}

export interface SwaggerModel {
    swagger: String;
    openapi: String;
    paths: any;
    servers: any;
    info: SwaggerInfoModel;
    host?: string;
    basePath?: String;
    tags: Array<SwaggerTagModel>;
    schemes?: Array<any>;
    securityDefinitions?: SwaggerSecurityDefinitionModel;
    components: any;
}
