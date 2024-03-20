interface UpdateTextPayload {
  type: 'updateText';
  payload: {
    nodeId: string;
    text: string;
  };
}

export type PostPluginMessagePayload = UpdateTextPayload;
