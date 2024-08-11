/// <reference types="astro/client" />
// just telling Astro that in Astro.locals is stored database

declare namespace App {
    interface Locals {
        // here belongs your database types
        message: String
    }
}

