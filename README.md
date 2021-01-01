# Proof-of-Concept-Mchad-Ext
Just a small piece of source code to show how to connect web extension with MChad

There are basically 2 different types of connection.
- HTTP Request only allows Extension -> Application data flow but it'll never cause an error that might freeze the extension.
- WebSocket allows Extension <-> Application adata flow but it's prone to error.

CheatSheat.txt shows the type and format of data that the app accept/broadcast.

It also contains some goodies on how to get livechat data from youtube with MutationObserver and how to enter data and trigger send live chat in youtube.
