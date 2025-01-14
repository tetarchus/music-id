import * as dotenv from "dotenv";
dotenv.config();

/**
 * Create Sentry Daemon
 */
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

if (process.env.NODE_ENV === "production")
    Sentry.init({
        dsn: process.env.BOT_SENTRY_DSN,
        tracesSampleRate: 1.0,
    });

/**
 * Import Bot Components
 */
import TwitchClient from "./components/twitch";
import Channels from "./components/channels";
import MessageHandler from "./components/handler";
import MessageComposer from "./components/composer";
import Identifier from "./components/identifier";
import Server from "./components/server";
import GraphQL from "./components/graphql";

/**
 * Instanciate Bot Components
 */
const graphql = new GraphQL();
const channels = new Channels(graphql);
const identifier = new Identifier(graphql);
const composer = new MessageComposer();
const handler = new MessageHandler(channels, composer, identifier);
const client = new TwitchClient(graphql, channels, handler);

new Server(client);
