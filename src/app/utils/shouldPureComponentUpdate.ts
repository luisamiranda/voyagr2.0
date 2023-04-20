import shallowEqual from './shallowEqual';

export default function shouldPureComponentUpdate(this: any, nextProps: any, nextState: any) {
  return !shallowEqual(this.props, nextProps) ||
         !shallowEqual(this.state, nextState);
}