import { callApi } from './lib/http.js'

export const TOOLS = [
  {
    name: "upload_project_image",
    description: "Upload a project image to Supabase storage via multipart/form-data. Requires an image file as input and returns the public URL of the uploaded image along with a success message.",
    inputSchema: {
        "type": "object",
        "properties": {
            "image": {
                "type": "string",
                "description": "The image file content to upload, provided as a base64-encoded string or file path for multipart/form-data submission."
            }
        },
        "required": [
            "image"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "upload_avatar",
    description: "Upload a user avatar image to Supabase storage via multipart form data. Requires the avatar file as a form field and returns the public URL of the uploaded image upon success.",
    inputSchema: {
        "type": "object",
        "properties": {
            "avatar": {
                "type": "string",
                "description": "Avatar file content or file path to upload as multipart/form-data."
            }
        },
        "required": [
            "avatar"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "authorize_oauth",
    description: "Initiates the OAuth authorization flow by redirecting to the frontend OAuth connect page. Requires a redirect URI to return the user to after authorization and a state parameter for CSRF protection and session continuity.",
    inputSchema: {
        "type": "object",
        "properties": {
            "state": {
                "type": "string",
                "description": "OAuth state parameter used for CSRF protection and maintaining state between the request and callback."
            },
            "redirect_uri": {
                "type": "string",
                "description": "The URI to redirect the user to after authorization is complete."
            }
        },
        "required": [
            "redirect_uri",
            "state"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "exchange_oauth_token",
    description: "Exchanges a Supabase access token for an OAuth authorization code by completing the OAuth callback flow. Requires a valid access token, redirect URI, and state parameter to prevent CSRF attacks. Returns a redirect URL containing the authorization code for the client to follow.",
    inputSchema: {
        "type": "object",
        "properties": {
            "state": {
                "type": "string",
                "description": "An opaque value used to maintain state between the request and callback, and to prevent CSRF attacks."
            },
            "access_token": {
                "type": "string",
                "description": "The Supabase access token to exchange for an OAuth authorization code."
            },
            "redirect_uri": {
                "type": "string",
                "format": "uri",
                "description": "The redirect URI to which the authorization code will be delivered. Must match the URI registered with the OAuth client."
            }
        },
        "required": [
            "access_token",
            "redirect_uri",
            "state"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "exchange_oauth_token",
    description: "Exchange an OAuth authorization code for an access token. Requires a valid client ID, client secret, and authorization code obtained from the OAuth authorization flow. Returns a bearer access token upon successful exchange.",
    inputSchema: {
        "type": "object",
        "properties": {
            "code": {
                "type": "string",
                "description": "The authorization code received from the OAuth authorization step to be exchanged for an access token."
            },
            "client_id": {
                "type": "string",
                "description": "The OAuth client ID identifying the application."
            },
            "client_secret": {
                "type": "string",
                "description": "The OAuth client secret associated with the client ID."
            }
        },
        "required": [
            "client_id",
            "client_secret",
            "code"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "delete_comment",
    description: "Deletes a comment by its ID. Only the owner of the comment is permitted to perform this action. Returns a confirmation message upon successful deletion.",
    inputSchema: {
        "type": "object",
        "properties": {
            "commentId": {
                "type": "string",
                "description": "The unique identifier of the comment to delete."
            }
        },
        "required": [
            "commentId"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "create_project",
    description: "Creates a new project on behalf of the authenticated user via the GPT action endpoint. Accepts project metadata including title, descriptions, tags, and optional links to a live demo or GitHub repository. Returns the created project object along with a success indicator.",
    inputSchema: {
        "type": "object",
        "properties": {
            "live": {
                "type": "string",
                "format": "uri",
                "description": "URL to the live deployment or demo of the project."
            },
            "tags": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "A list of tags or keywords associated with the project."
            },
            "title": {
                "type": "string",
                "description": "The title of the project."
            },
            "github": {
                "type": "string",
                "format": "uri",
                "description": "URL to the project's GitHub repository."
            },
            "full_desc": {
                "type": "string",
                "description": "A detailed, full description of the project."
            },
            "short_desc": {
                "type": "string",
                "description": "A brief summary or short description of the project."
            }
        },
        "required": [],
        "additionalProperties": false
    },
  },
  {
    name: "delete_project",
    description: "Delete a project by its unique ID. Permanently removes the specified project and returns a confirmation message upon success.",
    inputSchema: {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The unique identifier of the project to delete."
            }
        },
        "required": [
            "id"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "sync_user",
    description: "Syncs a Supabase user into the Neon users table by creating or updating the user record with the provided id, email, and name. All three fields are required to perform the sync operation.",
    inputSchema: {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The unique identifier of the Supabase user to sync."
            },
            "name": {
                "type": "string",
                "description": "The display name of the user."
            },
            "email": {
                "type": "string",
                "format": "email",
                "description": "The email address of the user."
            }
        },
        "required": [
            "id",
            "email",
            "name"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "get_current_user_profile",
    description: "Retrieves the profile of the currently authenticated user. Returns account details associated with the active session or token. No additional parameters are required.",
    inputSchema: {
        "type": "object",
        "properties": {},
        "required": [],
        "additionalProperties": false
    },
  },
  {
    name: "list_users",
    description: "Retrieves a list of all users in the system. Returns the full collection of user records available to the caller.",
    inputSchema: {
        "type": "object",
        "properties": {},
        "required": [],
        "additionalProperties": false
    },
  },
  {
    name: "update_user_profile",
    description: "Updates the authenticated user's profile information. All fields are optional — supply only the fields you wish to change, such as bio, avatar URL, social links, or username.",
    inputSchema: {
        "type": "object",
        "properties": {
            "bio": {
                "type": "string",
                "description": "A short biography or description for the user's profile."
            },
            "avatar": {
                "type": "string",
                "description": "URL pointing to the user's avatar image."
            },
            "github": {
                "type": "string",
                "description": "The user's GitHub profile URL or username."
            },
            "website": {
                "type": "string",
                "description": "The user's personal or professional website URL."
            },
            "linkedin": {
                "type": "string",
                "description": "The user's LinkedIn profile URL or username."
            },
            "username": {
                "type": "string",
                "description": "The user's desired username. May return a conflict error if already taken."
            }
        },
        "required": [],
        "additionalProperties": false
    },
  },
  {
    name: "delete_user",
    description: "Deletes a user by their unique ID. This operation is permanent and cannot be undone. Returns a confirmation message upon successful deletion.",
    inputSchema: {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The unique identifier of the user to delete."
            }
        },
        "required": [
            "id"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "create_project",
    description: "Creates a new project with the provided details. The title field is required; all other fields such as description, image, tags, and external links are optional. Returns the newly created project upon success.",
    inputSchema: {
        "type": "object",
        "properties": {
            "live": {
                "type": "string",
                "description": "URL to the live/deployed version of the project."
            },
            "tags": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "A list of tags or keywords associated with the project."
            },
            "image": {
                "type": "string",
                "description": "URL or path to the project's cover image."
            },
            "title": {
                "type": "string",
                "description": "The title of the project (required)."
            },
            "github": {
                "type": "string",
                "description": "URL to the project's GitHub repository."
            },
            "full_desc": {
                "type": "string",
                "description": "A detailed, full description of the project."
            },
            "short_desc": {
                "type": "string",
                "description": "A brief summary or short description of the project."
            }
        },
        "required": [
            "title"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "list_projects",
    description: "Retrieves all projects, optionally reflecting liked status when authentication context is provided. Returns a collection of project records available in the system.",
    inputSchema: {
        "type": "object",
        "properties": {},
        "required": [],
        "additionalProperties": false
    },
  },
  {
    name: "get_my_projects",
    description: "Retrieves all projects belonging to the currently logged-in user. Returns a list of projects associated with the authenticated account.",
    inputSchema: {
        "type": "object",
        "properties": {},
        "required": [],
        "additionalProperties": false
    },
  },
  {
    name: "get_project",
    description: "Retrieves a single project by its unique ID. Returns the full project details for the specified project.",
    inputSchema: {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The unique identifier of the project to retrieve."
            }
        },
        "required": [
            "id"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "update_project",
    description: "Updates an existing project by its ID with the provided fields. The title and short_desc fields are required; all other fields (live URL, tags, image, GitHub link, full description) are optional. Returns the updated project on success.",
    inputSchema: {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The unique identifier of the project to update."
            },
            "live": {
                "type": "string",
                "description": "URL to the live version of the project."
            },
            "tags": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "A list of tags associated with the project."
            },
            "image": {
                "type": "string",
                "description": "URL or path to the project's image."
            },
            "title": {
                "type": "string",
                "description": "The title of the project."
            },
            "github": {
                "type": "string",
                "description": "URL to the project's GitHub repository."
            },
            "full_desc": {
                "type": "string",
                "description": "A full, detailed description of the project."
            },
            "short_desc": {
                "type": "string",
                "description": "A short description of the project."
            }
        },
        "required": [
            "id",
            "title",
            "short_desc"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "like_project",
    description: "Like a project by its ID, toggling or registering the current user's like. Returns the updated like count and the liked status after the operation.",
    inputSchema: {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The unique identifier of the project to like."
            }
        },
        "required": [
            "id"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "unlike_project",
    description: "Remove a like from a project on behalf of the authenticated user. Requires authentication. Returns the updated like status and total like count for the project.",
    inputSchema: {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The unique identifier of the project to unlike."
            }
        },
        "required": [
            "id"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "add_project_comment",
    description: "Add a comment to a specified project by providing the project ID and comment text. The request requires authentication and a non-empty text body. Returns the created comment on success.",
    inputSchema: {
        "type": "object",
        "properties": {
            "text": {
                "type": "string",
                "description": "The content of the comment to add to the project."
            },
            "projectId": {
                "type": "string",
                "description": "The unique identifier of the project to comment on."
            }
        },
        "required": [
            "projectId",
            "text"
        ],
        "additionalProperties": false
    },
  },
  {
    name: "get_project_comments",
    description: "Retrieves all comments associated with a specific project. Requires a valid project ID as a path parameter.",
    inputSchema: {
        "type": "object",
        "properties": {
            "projectId": {
                "type": "string",
                "description": "The unique identifier of the project whose comments should be retrieved."
            }
        },
        "required": [
            "projectId"
        ],
        "additionalProperties": false
    },
  },
] as const

export const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  upload_project_image: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/upload"
    const query = undefined
    const headers = {
    "Content-Type": "multipart/form-data",
    } as Record<string, string>
    const body = {
    "image": String("${input.image}"),
    }
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  upload_avatar: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/upload/avatar"
    const query = undefined
    const headers = {
    "Content-Type": "multipart/form-data",
    } as Record<string, string>
    const body = {
    "avatar": String("${input.avatar}"),
    }
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  authorize_oauth: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/oauth/authorize"
    const query = {
    "state": String("${input.state}"),
    "redirect_uri": String("${input.redirect_uri}"),
    } as Record<string, string>
    const headers = undefined
    const body = undefined
    return callApi({
      method: "GET",
      url,
      query,
      headers,
      body,
      successCodes: [200,302],
    })
  },

  exchange_oauth_token: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/oauth/callback"
    const query = undefined
    const headers = {
    "Content-Type": "application/json",
    } as Record<string, string>
    const body = {
    "state": String("${input.state}"),
    "access_token": String("${input.access_token}"),
    "redirect_uri": String("${input.redirect_uri}"),
    }
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  exchange_oauth_token: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/oauth/token"
    const query = undefined
    const headers = {
    "Content-Type": "application/json",
    } as Record<string, string>
    const body = {
    "code": String("${input.code}"),
    "client_id": String("${input.client_id}"),
    "client_secret": String("${input.client_secret}"),
    }
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200],
    })
  },

  delete_comment: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/comments/" + String("${input.commentId}")
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "DELETE",
      url,
      query,
      headers,
      body,
      successCodes: [200,204],
    })
  },

  create_project: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/gpt/post-project"
    const query = undefined
    const headers = {
    "Content-Type": "application/json",
    } as Record<string, string>
    const body = {
    "live": String("${input.live}"),
    "tags": String("${input.tags}"),
    "title": String("${input.title}"),
    "github": String("${input.github}"),
    "full_desc": String("${input.full_desc}"),
    "short_desc": String("${input.short_desc}"),
    }
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  delete_project: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/projects/" + String("${input.id}")
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "DELETE",
      url,
      query,
      headers,
      body,
      successCodes: [200,204],
    })
  },

  sync_user: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/users"
    const query = undefined
    const headers = {
    "Content-Type": "application/json",
    } as Record<string, string>
    const body = {
    "id": String("${input.id}"),
    "name": String("${input.name}"),
    "email": String("${input.email}"),
    }
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  get_current_user_profile: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/users/me"
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "GET",
      url,
      query,
      headers,
      body,
      successCodes: [200],
    })
  },

  list_users: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/users"
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "GET",
      url,
      query,
      headers,
      body,
      successCodes: [200],
    })
  },

  update_user_profile: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/users/me"
    const query = undefined
    const headers = {
    "Content-Type": "application/json",
    } as Record<string, string>
    const body = {
    "bio": String("${input.bio}"),
    "avatar": String("${input.avatar}"),
    "github": String("${input.github}"),
    "website": String("${input.website}"),
    "linkedin": String("${input.linkedin}"),
    "username": String("${input.username}"),
    }
    return callApi({
      method: "PUT",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  delete_user: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/users/" + String("${input.id}")
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "DELETE",
      url,
      query,
      headers,
      body,
      successCodes: [200,204],
    })
  },

  create_project: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/projects"
    const query = undefined
    const headers = {
    "Content-Type": "application/json",
    } as Record<string, string>
    const body = {
    "live": String("${input.live}"),
    "tags": String("${input.tags}"),
    "image": String("${input.image}"),
    "title": String("${input.title}"),
    "github": String("${input.github}"),
    "full_desc": String("${input.full_desc}"),
    "short_desc": String("${input.short_desc}"),
    }
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  list_projects: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/projects"
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "GET",
      url,
      query,
      headers,
      body,
      successCodes: [200],
    })
  },

  get_my_projects: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/projects/me"
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "GET",
      url,
      query,
      headers,
      body,
      successCodes: [200],
    })
  },

  get_project: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/projects/" + String("${input.id}")
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "GET",
      url,
      query,
      headers,
      body,
      successCodes: [200],
    })
  },

  update_project: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/projects/" + String("${input.id}")
    const query = undefined
    const headers = {
    "Content-Type": "application/json",
    } as Record<string, string>
    const body = {
    "live": String("${input.live}"),
    "tags": String("${input.tags}"),
    "image": String("${input.image}"),
    "title": String("${input.title}"),
    "github": String("${input.github}"),
    "full_desc": String("${input.full_desc}"),
    "short_desc": String("${input.short_desc}"),
    }
    return callApi({
      method: "PATCH",
      url,
      query,
      headers,
      body,
      successCodes: [200],
    })
  },

  like_project: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/projects/" + String("${input.id}") + "/like"
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  unlike_project: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/projects/" + String("${input.id}") + "/like"
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "DELETE",
      url,
      query,
      headers,
      body,
      successCodes: [200,204],
    })
  },

  add_project_comment: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/comments/" + String("${input.projectId}")
    const query = undefined
    const headers = {
    "Content-Type": "application/json",
    } as Record<string, string>
    const body = {
    "text": String("${input.text}"),
    }
    return callApi({
      method: "POST",
      url,
      query,
      headers,
      body,
      successCodes: [200,201],
    })
  },

  get_project_comments: async (args) => {
    const url = (process.env.BASE_URL ?? '') + "/api/comments/" + String("${input.projectId}")
    const query = undefined
    const headers = undefined
    const body = undefined
    return callApi({
      method: "GET",
      url,
      query,
      headers,
      body,
      successCodes: [200],
    })
  },
}
