export {};

declare module 'pimaRemoteUI/PimaForbidden';

declare global {
  interface Window {
    __INITIAL_STATE__: Record<string, any>;
    WmChatLib: {
      ChatInstance: any;
      MessageProps: any;
      useMessages(messages: Omit<any, "_id">): {
        messages: any[]
        appendMsg(msg: any)
        updateMsg(id: any, msg: any)
        setTyping(typing: boolean, msg: any)
        deleteMsg(id: any)
        resetList()
      };
      mountChatChatgpt(el: string, props: object): void;
    }
  }

  // 全局类型声明
  interface CommonApiListData {
    data: Array<any>;
    total: number;
  }
}
