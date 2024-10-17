**Toggle Scroll Bars** allows you to see the scrollbar at all times. This is useful because the scrollbar also contains source control change markers. With scrollbars always visible you can more easily locate changes across the entire length of your document.

It does this by running a terminal command to set a user default:

`defaults write com.panic.Nova AppleShowScrollBars Always`

Or remove the default:

`defaults delete com.panic.Nova AppleShowScrollBars`

And the current setting is honoured when the extension becomes active by reading the value:

`defaults read com.panic.Nova AppleShowScrollBars`

## Usage

To configure this preference, open **Extensions → Extension Library...** then select Toggle Scroll Bars' **Settings** tab. You can then tick **Always Show Scroll Bars** checkbox.

> Important: you will need to restart Nova to see the changes.

## Screenshots

![on-off](https://raw.githubusercontent.com/gingerbeardman/Toggle-Scroll-Bars/refs/heads/main/scrollbars-on-minimap-off.png) ![off-off](https://raw.githubusercontent.com/gingerbeardman/Toggle-Scroll-Bars/refs/heads/main/scrollbars-off-minimap-off.png) 

![on-on](https://raw.githubusercontent.com/gingerbeardman/Toggle-Scroll-Bars/refs/heads/main/scrollbars-on-minimap-on.png) ![off-on](https://raw.githubusercontent.com/gingerbeardman/Toggle-Scroll-Bars/refs/heads/main/scrollbars-off-minimap-on.png)
