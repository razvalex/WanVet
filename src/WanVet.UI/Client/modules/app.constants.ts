import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
     DevServer: string = "https://localhost:44328";
     ProdServer: string = "https://localhost/WanVet";
     IdentityDevServer: string = "https://localhost:44348";
     IdentityProdServer: string = "https://localhost/IdentityProvider";
     IdentityClientDevName: string = "WanVetClientDev";
     IdentityClientProdName: string = "WanVetClient";
}