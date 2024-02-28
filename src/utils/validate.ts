export class Validate {
  static email(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  static Password = (val: string) => {
    return val.length >= 6;
  };

  static Event = (data: any) => {
    const errors: string[] = [];

    for (const i in data) {
      if (i !== 'description' && i !== 'users') {
        if (!data[i]) {
          errors.push(`${i} required!!!`);
        }
      }
    }

    return errors;
  };
}
