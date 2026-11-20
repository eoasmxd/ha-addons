# Changelog

## 1.0.6

- Hardened Model Context Protocol (MCP) OAuth discovery and client authentication.

## 1.0.5

- Decoupled the Home Assistant custom integration from the app. The official integration is now hosted on HACS, with version management and lifecycle handled independently.

## 1.0.4

- Added the Freya AI TTS proxy platform to wrap underlying TTS entities and optimize AI-generated text before speech synthesis.
- Decoupled plain-text cleaning from the conversation entity to preserve rich formatting in chat responses while delegating speech text cleaning to the TTS proxy.
- Enhanced plain-text cleaning to strip modern Emoji characters, preventing TTS engines from reading out emojis.

## 1.0.2

- Added Model Context Protocol (MCP) support.
- Added plain-text cleaning for TTS output.

## 1.0.1

- First official stable release (GA).
- Full-featured Home Assistant bidirectional integration with automated deployment.
- Fine-grained device control permissions and robust security interception.
- Support for conversation attachments, automation control, and voice agent integration.
