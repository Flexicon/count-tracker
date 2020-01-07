export const UserVisitedKey = 'count_tracker_visited'

export default function({ redirect, route }) {
  if (
    route.name !== 'welcome' &&
    localStorage &&
    !localStorage[UserVisitedKey]
  ) {
    return redirect('/welcome')
  }
}
