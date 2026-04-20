export default async function GitHubSuccessPage(){
    console.log("Github auth success")
    return (
        <div>
            <h1 className="text-2xl font-bold">GitHub Authentication Successful!</h1>
            <p>You can now close this window and return to the application.</p>
        </div>
    )
}