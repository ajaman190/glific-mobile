import React from 'react';
import { Linking } from 'react-native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import ChatScreen from '../screens/ChatScreen';
import {
  GET_CONTACT_AUDIO_MESSAGE_MOCK,
  GET_CONTACT_DOCUMENT_MESSAGE_MOCK,
  GET_CONTACT_IMAGE_MESSAGE_MOCK,
  GET_CONTACT_LOCATION_MESSAGE_MOCK,
  GET_CONTACT_MESSAGES_FLOW_MOCK,
  GET_CONTACT_MESSAGES_MOCK,
  GET_CONTACT_MESSAGES_POPUPS_MOCK,
  GET_CONTACT_NO_MESSAGE_MOCK,
  GET_CONTACT_QUCIK_REPLY_MESSAGE_MOCK,
  GET_CONTACT_STICKER_MESSAGE_MOCK,
  GET_CONTACT_TEXT_MESSAGE_MOCK,
  GET_CONTACT_VIDEO_MESSAGE_MOCK,
} from '../__mocks__/queries/contact';
import {
  GET_COLLECTION_NO_MESSAGE_MOCK,
  GET_COLLECTION_TEXT_MESSAGE_MOCK,
} from '../__mocks__/queries/collection';

const contactMock = {
  id: 1,
  displayName: 'test contact name',
  conversationType: 'contact',
  lastMessageAt: '2023-06-23T10:00:00.000Z',
};

const collectionMock = {
  id: 1,
  displayName: 'test collection name',
  conversationType: 'collection',
};

describe('Chat screen', () => {
  test('renders chat header & input correctly', async () => {
    const { getByTestId, getByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_NO_MESSAGE_MOCK
    );

    expect(getByTestId('backIcon')).toBeDefined();
    expect(getByTestId('userProfile')).toBeDefined();
    expect(getByText('test contact name')).toBeDefined();
    expect(getByTestId('menuIcon')).toBeDefined();

    expect(getByTestId('loadingIndicator')).toBeDefined();

    expect(getByTestId('upIcon')).toBeDefined();
    expect(getByTestId('emojiIcon')).toBeDefined();
    expect(getByTestId('chatInput')).toBeDefined();
    expect(getByTestId('clipIcon')).toBeDefined();
    expect(getByTestId('sendIcon')).toBeDefined();
  }, 15000);

  test('should open contact chat screen menu', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_NO_MESSAGE_MOCK
    );
    fireEvent.press(getByTestId('menuIcon'));
    await waitFor(async () => {
      const contactMenu = await getByTestId('contactChatMenu');
      expect(contactMenu).toBeDefined();
    });
  }, 5000);

  test('should open Collection chat screen menu', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...collectionMock } }} />,
      GET_COLLECTION_NO_MESSAGE_MOCK
    );
    fireEvent.press(getByTestId('menuIcon'));
    await waitFor(async () => {
      const collectionMenu = await getByTestId('collectionChatMenu');
      expect(collectionMenu).toBeDefined();
    });
  }, 5000);

  test('renders no message correctly', async () => {
    const { getByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_NO_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const testMessage = await getByText('No messages');
      expect(testMessage).toBeDefined();
    });
  }, 10000);

  test('renders colllection no message correctly', async () => {
    const { getByText } = customRender(
      <ChatScreen route={{ params: { ...collectionMock } }} />,
      GET_COLLECTION_NO_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const testMessage = await getByText('No messages');
      expect(testMessage).toBeDefined();
    });
  });

  test('renders test message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_TEXT_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const testMessage = await getByTestId('textMessage');
      expect(testMessage).toBeDefined();
    });
  });

  test('renders collection test message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...collectionMock } }} />,
      GET_COLLECTION_TEXT_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const testMessage = await getByTestId('textMessage');
      expect(testMessage).toBeDefined();
    });
  });

  test('renders image message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_IMAGE_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const imageMessage = await getByTestId('imageMessage');
      expect(imageMessage).toBeDefined();
    });
  });

  test('renders video message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_VIDEO_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const videoMessage = await getByTestId('videoMessage');
      expect(videoMessage).toBeDefined();
    });
  });

  test('renders audio message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_AUDIO_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const audioMessage = await getByTestId('audioMessage');
      expect(audioMessage).toBeDefined();
    });
  });

  test('renders document message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_DOCUMENT_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const documentMessage = await getByTestId('documentMessage');
      expect(documentMessage).toBeDefined();

      fireEvent.press(documentMessage);
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://www.buildquickbots.com/whatsapp/media/sample/pdf/sample01.pdf'
      );
    });
  });

  test('renders sticker message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_STICKER_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const stickerMessage = await getByTestId('stickerMessage');
      expect(stickerMessage).toBeDefined();
    });
  });

  test('renders location message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_LOCATION_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const locationMessage = await getByTestId('locationMessage');
      expect(locationMessage).toBeDefined();

      fireEvent.press(locationMessage);
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://www.google.com/maps/search/?api=1&query=41.725556,-49.946944'
      );
    });
  });

  test('renders quick reply message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_QUCIK_REPLY_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const quickReplyMessage = await getByTestId('quickReplyMessage');
      const quickOption0 = await getByTestId('quickOption0');
      const quickOption1 = await getByTestId('quickOption1');

      expect(quickReplyMessage).toBeDefined();
      expect(quickOption0).toBeDefined();
      expect(quickOption1).toBeDefined();
    });
  });

  test('should open options tab when press up in chat input', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_MESSAGES_MOCK
    );

    const upIcon = getByTestId('upIcon');
    fireEvent.press(upIcon);

    await waitFor(async () => {
      const optionsTab = await getByTestId('optionsTab');
      expect(optionsTab).toBeDefined();
    });
  });

  test('should open speed send bottom sheet when press up in chat input options', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_MESSAGES_MOCK
    );

    fireEvent.press(getByTestId('upIcon'));

    await waitFor(async () => {
      expect(getByTestId('speedSend')).toBeDefined();
      expect(getByTestId('templates')).toBeDefined();
      expect(getByTestId('interactive')).toBeDefined();

      fireEvent.press(getByTestId('speedSend'));

      expect(await getByTestId('quickTemplate1')).toBeDefined();
      expect(await getByTestId('quickTemplate2')).toBeDefined();
      expect(await getByTestId('quickTemplate3')).toBeDefined();
      expect(await getByTestId('quickTemplate4')).toBeDefined();

      const bsSearch = getByTestId('bsSearch');
      fireEvent.changeText(bsSearch, 'test search');
      expect(bsSearch.props.value).toBe('test search');

      const bsBackIcon = getByTestId('bsBackIcon');
      fireEvent.press(bsBackIcon);
    });
  });

  test('should open emojis tab when press emoji in chat input', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_MESSAGES_MOCK
    );

    fireEvent.press(getByTestId('emojiIcon'));

    await waitFor(async () => {
      const emojisTab = await getByTestId('emojisTab');
      expect(emojisTab).toBeDefined();

      const keyboardIcon = await getByTestId('keyboardIcon');
      expect(keyboardIcon).toBeDefined();
    });
  });

  test('should open attachments tab when press clip in chat input', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_MESSAGES_MOCK
    );

    fireEvent.press(getByTestId('clipIcon'));

    await waitFor(async () => {
      const emojisTab = await getByTestId('attachmentsTab');
      expect(emojisTab).toBeDefined();
    });
  });

  test('should start a flow', async () => {
    const { getByTestId, queryByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_MESSAGES_FLOW_MOCK
    );

    fireEvent.press(getByTestId('menuIcon'));

    await waitFor(async () => {
      const startFlowButton = await queryByText('Start a flow');
      fireEvent.press(startFlowButton);
    });

    await waitFor(async () => {
      const popupMenu = await getByTestId('startFlowPopup');
      const flowPicker = await getByTestId('flow-picker');

      expect(popupMenu).toBeDefined();
      expect(flowPicker).toBeDefined();

      expect(flowPicker.props.selectedIndex).toStrictEqual(0);

      const startButton = await queryByText('START');
      expect(startButton).toBeDefined();
      fireEvent.press(startButton);
    });
  }, 5000);

  test('should terminate a flow', async () => {
    const { getByTestId, queryByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_MESSAGES_POPUPS_MOCK
    );

    fireEvent.press(getByTestId('menuIcon'));

    await waitFor(async () => {
      const terminateFlowButton = queryByText('Terminate Flows');
      fireEvent.press(terminateFlowButton);
    });

    await waitFor(async () => {
      expect(getByTestId('chatPopup')).toBeDefined();
      expect(getByTestId('cancelButton')).toBeDefined();

      const yesButton = await queryByText('YES');
      expect(yesButton).toBeDefined();
      fireEvent.press(yesButton);
    });
  }, 5000);

  test('should clear conversation', async () => {
    const { getByTestId, queryByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_MESSAGES_POPUPS_MOCK
    );

    fireEvent.press(getByTestId('menuIcon'));

    await waitFor(async () => {
      const clearConversationButton = queryByText('Clear Conversation');
      fireEvent.press(clearConversationButton);
    });

    await waitFor(async () => {
      expect(getByTestId('chatPopup')).toBeDefined();
      expect(getByTestId('cancelButton')).toBeDefined();

      const yesButton = await queryByText('YES');
      expect(yesButton).toBeDefined();
      fireEvent.press(yesButton);
    });
  }, 5000);

  test('should block contact', async () => {
    const { getByTestId, queryByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      GET_CONTACT_MESSAGES_POPUPS_MOCK
    );

    fireEvent.press(getByTestId('menuIcon'));

    await waitFor(async () => {
      const blockContactButton = queryByText('Block Contact');
      fireEvent.press(blockContactButton);
    });

    await waitFor(async () => {
      expect(getByTestId('chatPopup')).toBeDefined();
      expect(getByTestId('cancelButton')).toBeDefined();

      const yesButton = await queryByText('YES');
      expect(yesButton).toBeDefined();
      fireEvent.press(yesButton);
    });
  }, 5000);
});
