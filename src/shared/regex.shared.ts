class CommonRegExp {
    public static readonly NAME_REGEXP = /^[A-Za-z]+[A-Za-z\s]{0,202}$/;
    public static readonly EMAIL_REGEXP = /^[a-zA-Z][a-zA-Z0-9._\-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]+)?$/;
	public static readonly PHONE_REGEXP = /^[1-9][0-9]{5,11}$/;
    public static readonly AADHAR_REGEXP = /^[0-9]{12}$/;
    public static readonly PAN_REGEXP = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
}

export {CommonRegExp};