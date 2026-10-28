# Changelog

## 1.0.4

- Add the Freya AI TTS proxy platform to wrap underlying TTS entities and optimize AI-generated text before speech synthesis.
- Decouple plain-text cleaning from the conversation entity to preserve rich formatting in chat responses while delegating speech text cleaning to the TTS proxy.
- Enhance plain-text cleaning to strip modern Emoji characters, preventing TTS engines from reading out emojis.

- 新增 Freya AI TTS 代理平台，用于封装底层 TTS 实体并在语音合成前优化 AI 生成的文本。
- 将纯文本清洗逻辑从对话实体中解耦，在保留对话回复富文本格式的同时，将语音文本清洗交由 TTS 代理处理。
- 增强纯文本清洗能力以过滤现代 Emoji 表情符号，防止 TTS 引擎朗读出表情字符。

## 1.0.2

- Add Model Context Protocol (MCP) support.
- Plain text cleaning for TTS output.

- 增加模型上下文协议（MCP）支持。
- 增加 TTS 语音纯文本清洗。

## 1.0.1

- First official stable release (GA).
- Full-featured Home Assistant bidirectional integration with automated deployment.
- Fine-grained device control permissions and robust security interception.
- Support for conversation attachments, automation control, and voice agent integration.

- 迎来首个正式稳定版本（General Availability）。
- 具备开箱即用的 Home Assistant 双向集成与自动部署能力。
- 完善的设备分级控制权限与高危操作安全拦截机制。
- 完整支持对话附件解析、自动化规则调用及语音对话代理（Assist）。
