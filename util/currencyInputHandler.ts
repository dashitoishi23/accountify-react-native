import { Platform, NativeModules } from "react-native";

const locale: string =
Platform.OS === 'ios'
  ? NativeModules.SettingsManager.settings.AppleLocale
  : NativeModules.I18nManager.localeIdentifier;

export const handleInputChange = (text: string) => {
    // Remove all non-numeric characters except for the decimal point
    const cleanedValue = text.replace(/[^0-9.]/g, '');

    // Convert to float and format as currency
    const formattedValue = cleanedValue
      ? new Intl.NumberFormat(locale.replace('_', '-')).format(parseFloat(cleanedValue))
      : '';
    
    return formattedValue;
  };