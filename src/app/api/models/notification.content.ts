export class NotificationContent {
    
    constructor(
        title:string,
        description:string,
        coverImageUri:string
    ) {
       
        this.title = title
        this.description = description
        this.coverImageUri = coverImageUri
        
    }

    title: string
    description: string
    coverImageUri: string

}