export function unescapeCode(code: number): number {
  switch (code) {
    case Char.LowerB: return Char.Backspace;
    case Char.LowerT: return Char.Tab;
    case Char.LowerN: return Char.LineFeed;
    case Char.LowerV: return Char.VerticalTab;
    case Char.LowerF: return Char.FormFeed;
    case Char.LowerR: return Char.CarriageReturn;
    case Char.DoubleQuote: return Char.DoubleQuote;
    case Char.SingleQuote: return Char.SingleQuote;
    case Char.Backslash: return Char.Backslash;
    default: return code;
  }
}

export const enum Access {
  Reset                   = 0b0000000000000,
  Ancestor                = 0b0000111111111,
  This                    = 0b0001000000000,
  Scope                   = 0b0010000000000,
  Member                  = 0b0100000000000,
  Keyed                   = 0b1000000000000
}

export const enum Precedence {
  Variadic                = 0b000111101,
  Assign                  = 0b000111110,
  Conditional             = 0b000111111,
  LogicalOR               = 0b001000000,
  LogicalAND              = 0b010000000,
  Equality                = 0b011000000,
  Relational              = 0b100000000,
  Additive                = 0b101000000,
  Multiplicative          = 0b110000000,
  Binary                  = 0b111000000,
  LeftHandSide            = 0b111000001,
  Primary                 = 0b111000010,
  Unary                   = 0b111000011,
}
/** @internal */
export const enum Token {
  EOF                     = 0b110000000000_000_000000,
  ExpressionTerminal      = 0b100000000000_000_000000,
  AccessScopeTerminal     = 0b010000000000_000_000000,
  ClosingToken            = 0b001000000000_000_000000,
  OpeningToken            = 0b000100000000_000_000000,
  BinaryOp                = 0b000010000000_000_000000,
  UnaryOp                 = 0b000001000000_000_000000,
  LeftHandSide            = 0b000000100000_000_000000,
  StringOrNumericLiteral  = 0b000000011000_000_000000,
  NumericLiteral          = 0b000000010000_000_000000,
  StringLiteral           = 0b000000001000_000_000000,
  IdentifierName          = 0b000000000110_000_000000,
  Keyword                 = 0b000000000100_000_000000,
  Identifier              = 0b000000000010_000_000000,
  Contextual              = 0b000000000001_000_000000,
  Precedence              = 0b000000000000_111_000000,
  Type                    = 0b000000000000_000_111111,
  FalseKeyword            = 0b000000000100_000_000000,
  TrueKeyword             = 0b000000000100_000_000001,
  NullKeyword             = 0b000000000100_000_000010,
  UndefinedKeyword        = 0b000000000100_000_000011,
  ThisScope               = 0b000000000110_000_000100,
  HostScope               = 0b000000000110_000_000101,
  ParentScope             = 0b000000000110_000_000110,
  OpenParen               = 0b010100100000_000_000111,
  OpenBrace               = 0b000100000000_000_001000,
  Dot                     = 0b000000100000_000_001001,
  CloseBrace              = 0b111000000000_000_001010,
  CloseParen              = 0b111000000000_000_001011,
  Comma                   = 0b110000000000_000_001100,
  OpenBracket             = 0b010100100000_000_001101,
  CloseBracket            = 0b111000000000_000_001110,
  Colon                   = 0b110000000000_000_001111,
  Question                = 0b110000000000_000_010000,
  Ampersand               = 0b110000000000_000_010011,
  Bar                     = 0b110000000000_000_010100,
  BarBar                  = 0b110010000000_010_010101,
  AmpersandAmpersand      = 0b110010000000_011_010110,
  EqualsEquals            = 0b110010000000_100_010111,
  ExclamationEquals       = 0b110010000000_100_011000,
  EqualsEqualsEquals      = 0b110010000000_100_011001,
  ExclamationEqualsEquals = 0b110010000000_100_011010,
  LessThan                = 0b110010000000_101_011011,
  GreaterThan             = 0b110010000000_101_011100,
  LessThanEquals          = 0b110010000000_101_011101,
  GreaterThanEquals       = 0b110010000000_101_011110,
  InKeyword               = 0b110010000100_101_011111,
  InstanceOfKeyword       = 0b110010000100_101_100000,
  Plus                    = 0b010011000000_110_100001,
  Minus                   = 0b010011000000_110_100010,
  TypeofKeyword           = 0b000001000100_000_100011,
  VoidKeyword             = 0b000001000100_000_100100,
  Asterisk                = 0b110010000000_111_100101,
  Percent                 = 0b110010000000_111_100110,
  Slash                   = 0b110010000000_111_100111,
  Equals                  = 0b100000000000_000_101000,
  Exclamation             = 0b000001000000_000_101001,
  TemplateTail            = 0b010000100000_000_101010,
  TemplateContinuation    = 0b010000100000_000_101011,
  OfKeyword               = 0b100000000101_000_101100
}

export const enum Char {
  Null           = 0x00,
  Backspace      = 0x08,
  Tab            = 0x09,
  LineFeed       = 0x0A,
  VerticalTab    = 0x0B,
  FormFeed       = 0x0C,
  CarriageReturn = 0x0D,
  Space          = 0x20,
  Exclamation    = 0x21,
  DoubleQuote    = 0x22,
  Dollar         = 0x24,
  Percent        = 0x25,
  Ampersand      = 0x26,
  SingleQuote    = 0x27,
  OpenParen      = 0x28,
  CloseParen     = 0x29,
  Asterisk       = 0x2A,
  Plus           = 0x2B,
  Comma          = 0x2C,
  Minus          = 0x2D,
  Dot            = 0x2E,
  Slash          = 0x2F,
  Semicolon      = 0x3B,
  Backtick       = 0x60,
  OpenBracket    = 0x5B,
  Backslash      = 0x5C,
  CloseBracket   = 0x5D,
  Caret          = 0x5E,
  Underscore     = 0x5F,
  OpenBrace      = 0x7B,
  Bar            = 0x7C,
  CloseBrace     = 0x7D,
  Colon          = 0x3A,
  LessThan       = 0x3C,
  Equals         = 0x3D,
  GreaterThan    = 0x3E,
  Question       = 0x3F,

  Zero   = 0x30,
  One    = 0x31,
  Two    = 0x32,
  Three  = 0x33,
  Four   = 0x34,
  Five   = 0x35,
  Six    = 0x36,
  Seven  = 0x37,
  Eight  = 0x38,
  Nine   = 0x39,

  UpperA = 0x41,
  UpperB = 0x42,
  UpperC = 0x43,
  UpperD = 0x44,
  UpperE = 0x45,
  UpperF = 0x46,
  UpperG = 0x47,
  UpperH = 0x48,
  UpperI = 0x49,
  UpperJ = 0x4A,
  UpperK = 0x4B,
  UpperL = 0x4C,
  UpperM = 0x4D,
  UpperN = 0x4E,
  UpperO = 0x4F,
  UpperP = 0x50,
  UpperQ = 0x51,
  UpperR = 0x52,
  UpperS = 0x53,
  UpperT = 0x54,
  UpperU = 0x55,
  UpperV = 0x56,
  UpperW = 0x57,
  UpperX = 0x58,
  UpperY = 0x59,
  UpperZ = 0x5A,

  LowerA  = 0x61,
  LowerB  = 0x62,
  LowerC  = 0x63,
  LowerD  = 0x64,
  LowerE  = 0x65,
  LowerF  = 0x66,
  LowerG  = 0x67,
  LowerH  = 0x68,
  LowerI  = 0x69,
  LowerJ  = 0x6A,
  LowerK  = 0x6B,
  LowerL  = 0x6C,
  LowerM  = 0x6D,
  LowerN  = 0x6E,
  LowerO  = 0x6F,
  LowerP  = 0x70,
  LowerQ  = 0x71,
  LowerR  = 0x72,
  LowerS  = 0x73,
  LowerT  = 0x74,
  LowerU  = 0x75,
  LowerV  = 0x76,
  LowerW  = 0x77,
  LowerX  = 0x78,
  LowerY  = 0x79,
  LowerZ  = 0x7A
}
