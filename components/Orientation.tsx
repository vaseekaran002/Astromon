import { Dimensions, ScaledSize } from 'react-native';

interface DimensionData extends ScaledSize {
  scale: number;
}

const msp = (dim: DimensionData, limit: number): boolean => {
  return dim.scale * dim.width >= limit || dim.scale * dim.height >= limit;
};

const isPortrait = (): boolean => {
  const dim: DimensionData = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const isLandscape = (): boolean => {
  const dim: DimensionData = Dimensions.get('screen');
  return dim.width >= dim.height;
};

const isTablet = (): boolean => {
  const dim: DimensionData = Dimensions.get('screen');
  return (
    (dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900))
  );
};

const isPhone = (): boolean => {
  return !isTablet();
};

export default {
  isPortrait,
  isLandscape,
  isTablet,
  isPhone,
};
