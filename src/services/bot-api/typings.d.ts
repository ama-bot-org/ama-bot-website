declare namespace BOTAPI {
  type TestQueryParams = {
    bot_id: string
    content: string
  }

  type TestQueryResult = {
    ActionType: 'OK' | 'FALSE'
    ans?: string
    err?: string
  }

  type UpdateQueryParams = {
    bot_id: string
  }

  type UpdateQueryResult = {
    ActionType: 'OK' | 'FALSE'
    ErrorCode?: string
  }
}
