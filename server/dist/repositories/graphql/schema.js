"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const graphql_live_query_1 = require("@n1ru4l/graphql-live-query");
const GraphQLUserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        avatar: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: (user) => user.avatar,
        },
        currentRoomname: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: (user) => user.avatar,
        },
        email: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: (user) => user.avatar,
        },
        geoCoord: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLInt),
            resolve: (user) => user.geo.coord,
        },
        geoPreferedDistance: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            resolve: (user) => user.geo.preferedDistance,
        },
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            resolve: (todo) => todo.id,
        },
        name: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: (user) => user.avatar,
        },
        roomHistory: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            resolve: (user) => user.roomHistory,
        },
        username: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: (user) => user.avatar,
        },
    },
});
const GraphQLMessageType = new graphql_1.GraphQLObjectType({
    name: 'Message',
    fields: {
        createdAt: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            resolve: (message) => message.createdAt,
        },
        from: {
            type: new graphql_1.GraphQLList(GraphQLUserType),
            resolve: (message) => message.createdAt,
        },
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            resolve: (message) => message.id,
        },
        text: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: (message) => message.text,
        },
    },
});
const GraphQLRoomType = new graphql_1.GraphQLObjectType({
    name: 'Room',
    fields: {
        roomname: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            resolve: (room) => room.roomname,
        },
        users: {
            type: new graphql_1.GraphQLList(GraphQLUserType),
            resolve: (room) => room.users,
        },
        messages: {
            type: new graphql_1.GraphQLNonNull(GraphQLMessageType),
            resolve: (room) => room.messages,
        },
    },
});
const GraphQLTodoType = new graphql_1.GraphQLObjectType({
    name: 'Todo',
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            resolve: (todo) => todo.id,
        },
        content: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: (todo) => todo.content,
        },
        isCompleted: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
            resolve: (todo) => todo.isCompleted,
        },
    },
});
const GraphQLQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        todos: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(GraphQLTodoType))),
            resolve: (root, args, context) => Array.from(root.todos.values()),
        },
        users: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(GraphQLUserType))),
            resolve: (root, args, context) => Array.from(root.users.values()),
        },
        rooms: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(GraphQLRoomType))),
            resolve: (root, args, context) => Array.from(root.rooms.values()),
        },
    },
});
const GraphQLTodoAddResultType = new graphql_1.GraphQLObjectType({
    name: 'TodoAddResult',
    fields: {
        addedTodo: {
            type: new graphql_1.GraphQLNonNull(GraphQLTodoType),
        },
    },
});
const GraphQLTodoRemoveResultType = new graphql_1.GraphQLObjectType({
    name: 'TodoRemoveResult',
    fields: {
        removedTodoId: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
        },
    },
});
const GraphQLTodoToggleIsCompletedResultType = new graphql_1.GraphQLObjectType({
    name: 'TodoToggleIsCompletedResult',
    fields: {
        toggledTodo: {
            type: new graphql_1.GraphQLNonNull(GraphQLTodoType),
        },
    },
});
const GraphQLTodoChangeContentResultType = new graphql_1.GraphQLObjectType({
    name: 'TodoChangeContentResult',
    fields: {
        changedTodo: {
            type: new graphql_1.GraphQLNonNull(GraphQLTodoType),
        },
    },
});
const GraphQLMutationType = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        todoAdd: {
            type: new graphql_1.GraphQLNonNull(GraphQLTodoAddResultType),
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                },
                content: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
            },
            resolve: (root, args, context) => {
                // Skip if it has already been added by another person.
                if (root.todos.has(args.id)) {
                    throw new Error('Todo does already exist.');
                }
                const addedTodo = {
                    id: args.id,
                    content: args.content,
                    isCompleted: false,
                };
                root.todos.set(args.id, addedTodo);
                context.liveQueryStore.invalidate(`Query.todos`);
                return {
                    addedTodo,
                };
            },
        },
        todoDelete: {
            type: new graphql_1.GraphQLNonNull(GraphQLTodoRemoveResultType),
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                },
            },
            resolve: (root, args, context) => {
                root.todos.delete(args.id);
                context.liveQueryStore.invalidate(`Query.todos`);
                return {
                    removedTodoId: args.id,
                };
            },
        },
        todoToggleIsCompleted: {
            type: new graphql_1.GraphQLNonNull(GraphQLTodoToggleIsCompletedResultType),
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                },
            },
            resolve: (root, args, context) => {
                const todo = root.todos.get(args.id);
                if (!todo) {
                    throw new Error(`Todo with id '${args.id}' does not exist.`);
                }
                todo.isCompleted = !todo.isCompleted;
                context.liveQueryStore.invalidate(`Todo:${args.id}`);
                return {
                    toggledTodo: todo,
                };
            },
        },
        todoChangeContent: {
            type: new graphql_1.GraphQLNonNull(GraphQLTodoChangeContentResultType),
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                },
                content: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
            },
            resolve: (root, args, context) => {
                const todo = root.todos.get(args.id);
                if (!todo) {
                    throw new Error(`Todo with id '${args.id}' does not exist.`);
                }
                todo.content = args.content;
                context.liveQueryStore.invalidate(`Todo:${args.id}`);
                return {
                    changedTodo: todo,
                };
            },
        },
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: GraphQLQueryType,
    mutation: GraphQLMutationType,
    directives: [graphql_live_query_1.GraphQLLiveDirective],
});
//# sourceMappingURL=schema.js.map