import { authMiddleware, redirectToSignIn, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    publicRoutes: ["/", "/public/:pasteId"],
    async afterAuth(auth, req, evt) {
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }
        if (auth.userId && req.nextUrl.pathname !== "/create") {
            const { firstName, lastName, imageUrl, username } =
                await clerkClient.users.getUser(auth.userId);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append(
                "Authorization",
                `Bearer ${await auth.getToken()}`
            );

            fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/v1/api/users/`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    id: auth.userId,
                    fullName: `${firstName} ${lastName}`,
                    username: username,
                    imageUrl: imageUrl,
                }),
                redirect: "follow",
            })
                .then((response) => {
                    console.log("response from fetch ", response);
                    return response.json();
                })
                .then((result) =>
                    NextResponse.redirect(
                        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/create`
                    )
                )
                .catch((error) => console.error("error", error));
        }
    },
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
